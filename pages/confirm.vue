<script setup lang="ts">
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/home");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <p class="u-text-black">Redirecting you to WeAttend Dashboard page...</p>
  </div>
</template>
<style scoped>
.u-text-black {
  display: flex;
  margin-top: 50%;
  margin-left: 50%;
  justify-content: center;
  align-items: center;
}
</style>
