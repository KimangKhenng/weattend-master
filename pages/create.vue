<script setup lang="ts">
import swal from 'sweetalert';
import { ref } from 'vue';
import { useRouter } from "vue-router"; 

const router = useRouter();
const name = ref('');
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleFormSubmit = async (event: Event) => {
  event.preventDefault(); // Prevent default form submission behavior
  // Check if form is valid
  const form = document.getElementById("form") as HTMLFormElement;
  if (form.checkValidity()) {
    const userId = user.value?.id;
    const url = name.value.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const { data, error } = await supabase.from('events').insert(
      {
        name: name.value, 
        host: userId,
        url: url
      })
    console.log(error)
    // Get current log user

    // Create new event on server
    swal("You've sucessfully created an event.");
    router.push(`/events/live/${url}`);
  } else {
    form.reportValidity(); 
  }
};

</script>

<template>
  <title>WeAttend - Create Event</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>Create Event</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <form
      @submit.prevent="handleFormSubmit"
      id="form"
      class="needs-validation"
      novalidate
    >
      <div class="input-group flex-nowrap">
        <span
          class="input-group-text"
          id="addon-wrapping"
          style="border-radius: 15px 0 0 15px"
          ><Icon name="ic:baseline-edit-calendar"
        /></span>
        <input
          type="text"
          id="eventinput"
          class="form-control"
          name="event_name"
          v-model="name"
          placeholder="Give your event a name..."
          aria-label="event_name"
          aria-describedby="addon-wrapping"
          style="border-radius: 0 15px 15px 0"
          required
        />
      </div>
      <small style="font-size: x-small">
        *Instruction & Policy: <br />
        <ul>
          <li>
            1. You can only create an event in a timeline with unlimited of
            duration and attendee as long as you closed the event.
          </li>
          <li>
            2. Only you can see the number and detail such as name, date and
            attending timestamp of the attendee in the event you created.
          </li>
          <li>
            3. Once you created the event, you’re inaccessible to navigation bar
            unless you closed the event.
            <li>
              4. If you close tab or config URL or some other actions that lead to cut off the progress of event, thus event would automatically be ended.
            </li>
          </li>
          <li>5. You logically can host only an event at a moment.</li>
        </ul>
      </small>
      <div class="d-grid gap-2" style="margin-top: 20px">
        <button class="btn btn-success" type="submit">Create</button>
      </div>
    </form>
  </div>
  <NavBar />
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
</style>
