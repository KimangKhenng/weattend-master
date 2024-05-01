<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const activeTab = ref('my_event')

function loadSection(sectionId: string): void {
  activeTab.value = sectionId;
}

const userID = user.value?.id

const { data: joinedEvents, refresh: Refresh } = await useAsyncData('joinedEvents', async () => {
  const { data } = await supabase.from('attendees').select(
    `
    joined_date,
    events(*)
    `
  ).eq('user_id', userID)
  return data
})

const { data: myEvents, refresh: RefreshEvent } = await useAsyncData('myEvents', async () => {
  const { data } = await supabase.from('events').select("*").eq('host', userID)
  return data
})


// export default {
//   data() {
//     return {
//       activeTab: "my_event",
//     };
//   },
//   methods: {
//     loadSection(sectionId: string): void {
//       this.activeTab = sectionId;
//     },
//   },
// };
</script>
<template>
  <title>WeAttend - Dashboard</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>Dashboard</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <div
      class="btn-group nav justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
      style="margin-top: 10px;"
    >
      <input
        @click="loadSection('my_event')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-success" for="btnradio1"
        ><Icon name="f7:person-2-square-stack-fill" size="30" /><br />My
        Event</label
      >

      <input
        @click="loadSection('joined_event')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label class="btn btn-outline-success" for="btnradio2"
        ><Icon name="ic:round-groups" size="30" /><br />Joined Event</label
      >
    </div>

    <div style="margin-top: 1rem"></div>

    <section id="my_event" v-show="activeTab === 'my_event'">
      <MyEventCard v-for="(item, index) in myEvents"
      :key="index"
      :name="item.name"
      :event-id="item.id"
      :created-on="item.created_at"
      :url="item.url"
      />
    </section>

    <section id="joined_event" v-show="activeTab === 'joined_event'">
      <JoinedEventCard v-for="(item, index) in joinedEvents" 
      :key="index" 
      :name="item.events.name"
      :host="item.events.host"
      :joined_at="item.joined_date"
      :created_on="item.events.created_at"
       />
    </section>
  </div>
  <NavBar />
</template>

<style scoped>
.header-container {
  position: sticky; /* Make container sticky to top */
  top: 70px; /* Adjust top position as needed */
  display: flex; /* Make container a flexbox */
  align-items: center; /* Align content vertically within container */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem; /* Add some padding for aesthetics */
}

.left-image {
  width: 50px; /* Set width for square image */
  height: 50px; /* Set height for square image */
  margin-right: 10px; /* Add margin to the right */
  border-radius: 10px;
}

.text-container {
  flex: 1; /* Allow text container to grow and fill remaining space within header */
}

.user-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.content-container {
  margin: 1rem;
}

a {
  text-decoration: none;
}

.radio-container {
  display: flex;
  justify-content: center;
}
</style>
