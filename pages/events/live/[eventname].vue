<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from "vue-router";
import type { RealtimeChannel } from '@supabase/supabase-js';

let activeTab = ref('qr_code');

const route = useRoute();
const event = route.params.eventname;
const supabase = useSupabaseClient();

const { data: eventData, error } = await supabase.from('events').select("*").eq('url',event).single() 

const { data: attendees, refresh: refreshAttendee } = await useAsyncData('attendees', async () => {
  const { data } = await supabase.from('attendees').select(
    `
    joined_date,
    users(*)
    `
  ).eq('event_id',eventData.id)
  return data
})

function loadSection(sectionId: string): void {
    activeTab.value = sectionId;
}
async function displayEventName(){
    // console.log(event)
    // console.log(eventData)
    console.log(attendees.value)
}

let realtimeChannel: RealtimeChannel

onMounted(() => {
  realtimeChannel = supabase.channel('public:attendees').on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'attendees' },
    () => refreshAttendee()
  )
  realtimeChannel.subscribe()
})
</script>

<template>
  <title>WeAttend - Create</title>
  <nav>
    <div class="header-container">
      <div class="text-container">
        <h3><Icon name="ic:baseline-calendar-month" />{{ eventData.name }}</h3>
      </div>
    </div>
  </nav>

  <div class="content-container">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <span class="nav-link disabled"
          ><Icon name="ic:round-groups" size="30" /> <b>1</b></span
        >
      </li>
      <li class="nav-item">
        <span class="nav-link disabled"
          ><Icon name="ic:round-calendar-month" size="30" />
          <b>15-07-2024, 12:00</b></span
        >
      </li>
    </ul>
    <div
      class="btn-group nav justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        @click="loadSection('qr_code')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-success" for="btnradio1"
        ><Icon name="ic:baseline-qr-code-2" size="30" /><br />QR Code</label
      >

      <input
        @click="loadSection('attendee_list')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label class="btn btn-outline-success" for="btnradio2"
        ><Icon name="ic:round-groups" size="30" /><br />Attendee List</label
      >
    </div>
    <div style="margin-top: 10px"></div>

    <!-- QR code section -->
    <section id="qr_code" v-show="activeTab === 'qr_code'">
      <div class="qr-box" @click="displayEventName">
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${event}`"
          alt="QR Code"
        />
      </div>
      <p class="text-center justify">
        <Icon name="solar:scanner-bold" size="60" />
        <br />
        Let your attendee scan this QR code to note into the attendance list.
      </p>
    </section>
    
    <!-- Attendee list section -->
    <section id="attendee_list" v-show="activeTab === 'attendee_list'">
      <AttendeeCard v-for="(item, index) in attendees" 
      :key="index" 
      :name="item.users.name"
      :avatar="item.users.avatar"
      :joined="item.joined_date"
      />
    </section>
    <TerminateButton />
  </div>
</template>

<style scoped>
.btn {
  border-radius: 15px;
}
.header-container {
  position: sticky;
  top: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.text-container {
  flex: 1;
}

.content-container {
  margin: 1rem;
}
.qr-box {
  padding-top: 3rem;
  margin: -1rem;
  width: 100vw; /* Adjust initial width as needed */
  height: 500px; /* Adjust initial height as needed */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%; /* Ensure image shrinks to fit the box */
  max-height: 100%; /* Ensure image shrinks to fit the box */
}
</style>
