<script setup lang="ts">
import { useRoute } from "vue-router";
import type { RealtimeChannel } from '@supabase/supabase-js';
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const route = useRoute();
const event = route.params.eventname;

const { data: eventData, error } = await supabase.from('events').select("*").eq('url',event).single() 

const { data: Count } = await useAsyncData('Count', async () => {
  const { data, count } = await supabase
  .from('attendees')
  .select("*",{ count: 'exact' })
  .eq('event_id', eventData.id)
  return count
})

const { data: attendees, refresh: refreshAttendee } = await useAsyncData('attendees', async () => {
  const { data } = await supabase.from('attendees').select(
    `
    joined_date,
    users(*)
    `
  ).eq('event_id',eventData.id)
  return data
})

onMounted(() => {
  const realtimeChannel = supabase.channel('public:attendees').on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'attendees' },
    () => refreshAttendee()
  )
  realtimeChannel.subscribe()
})

</script>
<template>
  <title>WeAttend - {{ eventData.name }}</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>{{ eventData.name }}</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>
  <div class="content-container">
    <div class="alert alert-success" role="alert">
      <Icon name="ic:round-groups" /> Attendee: <b>{{ Count }}</b>
      <br />
      <Icon name="ic:round-calendar-month" /> Created on:
      <b>15-07-2024, 12:01</b>
    </div>
    <AttendeeCard v-for="(item, index) in attendees" 
      :key="index" 
      :name="item.users.name"
      :avatar="item.users.avatar"
      :joined="item.joined_date"
      />
  </div>
  <NavBar />
</template>
<style scoped>
.header-container {
  position: sticky;
  top: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.text-container {
  flex: 1; /* Allow text container to grow and fill remaining space within header */
}

.content-container {
  margin: 1rem;
}

a {
  text-decoration: none;
}
</style>
