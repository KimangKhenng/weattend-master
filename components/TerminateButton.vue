<script setup lang="ts">
import { useRouter } from "vue-router"; // Import for navigation

const router = useRouter();

const terminateProcess = () => {
  const confirmed = window.confirm(
    "Are you sure you want to end the event? This action cannot be undone."
  );

  if (confirmed) {
    // Handle termination logic here (e.g., API call, data update)
    router.push("/create");
  }
};
</script>

<template>
  <div class="d-grid gap-2" style="margin-top: 1rem">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="terminateProcess()"
    >
      <Icon name="ic:baseline-close" /> Terminate event
    </button>
  </div>
</template>
