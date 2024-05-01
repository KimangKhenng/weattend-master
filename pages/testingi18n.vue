<script setup>
const { locale, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('km')">km</button>
      <p>{{ $t("signout") }}</p>
    </div>
  </div>
</template>
