// plugins/no-ssr.js
import Vue from 'vue'

function registerVideoComponent(Vue) {
  const CustomVideo = Vue.extend({
    name: 'custom-video',
    props: {
      source: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      if (this.source.tag === 'video') {
        this.createMediaStream()
      }
    },
    methods: {
      createMediaStream() {
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: this.source.options }).then((stream) => {
            this.source.value.srcObject = stream
            requestAnimationFrame(() => {
              this.createMediaStream()
            })
          })
        }
      },
    },
    render(h) {
      return h('div', this.source.tag ? this.source.value : [this.source.value])
    },
  })

  Vue.component('custom-video', CustomVideo)
}

if (process.BROWSER_BUILD) {
  registerVideoComponent(Vue)
}
