<script setup lang="ts">
const supabase = useSupabaseClient();

interface Event {
  name: string;
  attends: string;
  created_on: string;
  url: string;
}

const props = defineProps<{
  eventId: string;
  url: string;
  name: string;
  createdOn: string;
}>()

const user = useSupabaseUser();

const { data: eventData, count: Count } = await supabase.from('attendees').select("*",{ count: 'exact' }).eq('event_id',props.eventId)
console.log(Count)
// console.log(eventData)

const localEvent = ref<Event>({
  name: props.name, // fetched data from the database
  attends: Count, //fetched data from the database
  created_on: props.createdOn,
  url: props.url
});

</script>

<template>
  <!-- IGNORE THIS SEARCH FUNCTION -->
  <div class="input-group flex-nowrap">
    <span
      class="input-group-text"
      id="addon-wrapping"
      style="border-radius: 15px 0 0 15px"
      ><Icon name="ic:baseline-search" size="24"
    /></span>
    <input
      type="text"
      onkeyup="search_event()"
      class="form-control"
      name="event_name"
      placeholder="Search event name"
      aria-label="event_name"
      aria-describedby="addon-wrapping"
      style="border-radius: 0 15px 15px 0"
    />
  </div>

  <!-- CARD COMPONENT -->
  <div class="list-group">
    <NuxtLink
      :to="`/events/${localEvent.url}`"
      type="button"
      class="list-group-item list-group-item-action"
    >
      <h6>{{ localEvent.name }}</h6>
      <!-- fetch from database to replace event name-->
      <div style="font-size: small">
        <p id="attendee_total">
          <Icon name="ic:round-groups" /> Attendee: <b>{{ localEvent.attends }}</b>
          <!-- fetch from database to replace number-->
        </p>
        <p id="created_date">
          <Icon name="ic:round-calendar-month" /> Created on:
          <b>{{ localEvent.created_on }}</b>
          <!-- fetch from database to replace date-->
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
<style scoped>
.list-group {
  margin-top: 18px;
}
</style>
