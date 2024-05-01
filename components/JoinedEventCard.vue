<script setup lang="ts">

const supabase = useSupabaseClient();

interface Event {
  name: string;
  host: string;
  joined_at: string;
  created_on: string;
}

const props = defineProps<{
  name: string;
  host: string;
  joined_at: string;
  created_on: string;
}>()

// const { data: eventData, error: eventError } = await supabase.from('events').select("*").eq('host',props.host).single()

console.log(props.host)
const { data: hostData, error } = await supabase.from('users').select("*").eq('id',props.host).single()

console.log(hostData)

const localEvent = ref<Event>({
  name: props.name, // fetched data from the database
  host: hostData.name, //fetched data from the database
  joined_at: props.joined_at,
  created_on: props.created_on,
});

</script>
<template>
  <!-- IGNORE THIS SEARCH FUNCTION -->
  <!-- <div class="input-group flex-nowrap">
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
  </div> -->

  <!-- CARD COMPONENT -->
  <div class="list-group" style="margin-top: 18px">
    <div class="list-group-item list-group-item-action">
      <h6>{{ localEvent.name }}</h6>
      <!-- fetch from database to replace event name-->
      <div style="font-size: small">
        <p id="host">
          <Icon name="ic:baseline-account-circle" /> Host:
          <b>{{ localEvent.host }}</b>
          <!-- fetch from database to replace name of host-->
        </p>
        <p id="joined_at">
          <Icon name="ic:baseline-person-add-alt-1" /> Joined at:
          <b>{{ localEvent.joined_at }}</b>
          <!-- fetch from database to replace date-->
        </p>
        <p id="created_date">
          <Icon name="ic:round-calendar-month" /> Created on:
          <b>{{ localEvent.created_on }}</b>
          <!-- fetch from database to replace date-->
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list-group {
  margin-top: 18px;
}
</style>
