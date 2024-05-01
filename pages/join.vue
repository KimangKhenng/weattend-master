<template>
  <div>
    <nav>
      <div class="header-container">
        <TopBarLogo />
        <div class="text-container">
          <h3>Join Event</h3>
        </div>
        <TopBarAvatar />
      </div>
    </nav>
    <div>
      <qrcode-stream
        :constraints="{ deviceId: selectedDevice.deviceId }"
        :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
        v-if="selectedDevice !== null"
      />
      <p
        v-else
        class="error"
      >
        No cameras on this device
      </p>
    </div>
    <NavBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import swal from 'sweetalert';
import { useRouter } from "vue-router"; 

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const result = ref('')

/*** select camera ***/

const selectedDevice = ref(null)
const devices = ref([])

async function onDetect(detectedCodes){
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
  // Find Event in DB
  // console.log(detectedCodes[0].rawValue)
  // console.log(user.value?.id)
  const { data, error } = await supabase.from('events').select("*").eq('url', detectedCodes[0].rawValue).single()
  // console.log(data);
  // Join event by creating attendee object and link event id
  // console.log(detectedCodes[0].rawValue)
  const userId = user.value?.id;
  const {data: attendee, error: err} = await supabase.from('attendees').insert(
    {
      event_id: data.id, 
      user_id: userId,
    }
  )
  console.log(attendee)
  console.log(err)

  swal(`You've sucessfully join an event: ${data.name}`);
  
  router.push('/home');
  }




onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === 'videoinput'
  )

  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0]
  }
})

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false
})
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})

/*** error handling ***/

const error = ref('')

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}

</script>

<style scoped>
.text-center {
  text-align: center;
  font-size: xx-small;
  margin-top: 10px;
}
.header-container {
  position: sticky;
  top: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.left-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 10px;
}

.text-container {
  flex: 1;
}

.user-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.content-container {
  margin: 1rem;
}

.camera-container {
  width: 100%;
  max-width: 100vw;
  height: 500px; /* Adjust this value as needed */
  width: calc(100vw - 35px); /* Adjust as needed */
  margin: 1rem auto; /* Adjust margin if needed */
  border: 2px solid #ccc;
  position: relative;
}

.error {
  font-weight: bold;
  color: red;
}

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
}

</style>