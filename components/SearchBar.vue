<!-- NOT IMPORTANT, OPTIONAL FUNCTION -->
<script lang="ts">
const searchBar = document.getElementById("searchbar") as HTMLInputElement;

document.addEventListener("keydown", (event: KeyboardEvent) => {
  const isCtrlK = event.ctrlKey && event.key.toLowerCase() === "k";
  const isMetaK = event.metaKey && event.key.toLowerCase() === "k";
  const isSlash = event.key.toLowerCase() === "/";

  if (isCtrlK || isMetaK || isSlash) {
    event.preventDefault();
    if (event.target === searchBar) {
      searchBar.focus();
    }
  }
});
</script>
<template>
  <div class="input-group flex-nowrap">
    <span
      class="input-group-text"
      id="addon-wrapping"
      style="border-radius: 15px 0 0 15px"
      ><Icon name="ic:baseline-search" size="24"
    /></span>
    <input
      type="text"
      class="form-control"
      name="event_name"
      placeholder="Search Event name"
      aria-label="event_name"
      aria-describedby="addon-wrapping"
      style="border-radius: 0 15px 15px 0"
      required
    />
  </div>
</template>
