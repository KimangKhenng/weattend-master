<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const { locale, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const confirmSignOut = async () => {
  const confirmed = confirm(`Are you sure you want to sign out from WeAttend?`);
  if (confirmed) {
    await client.auth.signOut();
    navigateTo("/");
  }
};
</script>
<template>
  <title>WeAttend - Settings</title>
  <nav>
    <div class="header-container">
      <TopBarLogo />
      <div class="text-container">
        <h3>Settings</h3>
      </div>
      <TopBarAvatar />
    </div>
  </nav>

  <div class="content-container">
    <div class="text-center">
      <img
        :src="user?.user_metadata.avatar_url"
        class="rounded mx-auto d-block"
        width="150px"
        height="150px"
        alt="user_avatar"
      />
      <h3 style="margin-top: 20px">{{ user?.user_metadata.full_name }}</h3>
      <p>
        <span class="badge rounded-pill text-bg-dark"
          ><Icon name="logos:google-icon" size="15" />
          {{ user?.user_metadata.email }}</span
        >
      </p>
      <p>
        <Icon name="tabler:heart-handshake" size="24" /><br />
        Created on: {{ user?.created_at }}
      </p>
    </div>
    <div class="d-grid gap-2" style="margin-top: 20px">
      <button
        v-if="user"
        class="btn btn-outline-danger"
        @click="confirmSignOut"
        type="button"
      >
        <Icon name="ic:outline-logout" />
        Sign out
      </button>
    </div>
  </div>
  <NavBar />
</template>

<style scoped>
p {
  font-size: small;
}
.header-container {
  position: sticky; /* Make container sticky to top */
  top: 70px; /* Adjust top position as needed */
  display: flex; /* Make container a flexbox */
  align-items: center; /* Align content vertically within container */
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem; /* Add some padding for aesthetics */
  /* Remove flex: 1; to prevent header from expanding */
}

.left-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
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

.text-center {
  text-align: center;
}
.btn {
  border-radius: 15px;
}
.select {
  border-radius: 15px;
}
</style>
