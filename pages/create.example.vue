<script lang="ts">
export default {
  data() {
    return {
      activeTab: "qr_code",
    };
  },
  methods: {
    loadSection(sectionId: string): void {
      this.activeTab = sectionId;
    },
  },
};
</script>
<template>
  <title>WeAttend - Create</title>
  <nav>
    <div class="header-container">
      <div class="text-container">
        <h3><Icon name="ic:baseline-calendar-month" /> Event Example</h3>
      </div>
    </div>
  </nav>

  <div class="content-container">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <span class="nav-link disabled"
          ><Icon name="ic:round-groups" size="30" /> <b>1</b></span
        >
      </li>
      <li class="nav-item">
        <span class="nav-link disabled"
          ><Icon name="ic:round-calendar-month" size="30" />
          <b>15-07-2024, 12:00</b></span
        >
      </li>
    </ul>
    <div
      class="btn-group nav justify-content-center"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        @click="loadSection('qr_code')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-success" for="btnradio1"
        ><Icon name="ic:baseline-qr-code-2" size="30" /><br />QR Code</label
      >

      <input
        @click="loadSection('attendee_list')"
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label class="btn btn-outline-success" for="btnradio2"
        ><Icon name="ic:round-groups" size="30" /><br />Attendee List</label
      >
    </div>
    <div style="margin-top: 10px"></div>

    <!-- QR code section -->
    <section id="qr_code" v-show="activeTab === 'qr_code'">
      <div class="qr-box">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-dHN4KiD3dsU%2FXRxU5JRV7DI%2FAAAAAAAAAz4%2Fu1ynpCMIuKwZMA642dHEoXFVKuHQbJvwgCEwYBhgL%2Fs1600%2Fqr-code.png&f=1&nofb=1&ipt=6a211f0c82bb923019161fefe2a739ad014a150c6d1528f86e0398af5fb490ee&ipo=images"
          alt="QR Code"
        />
      </div>
      <p class="text-center justify">
        <Icon name="solar:scanner-bold" size="60" />
        <br />
        Let your attendee scan this QR code to note into the attendance list.
      </p>
    </section>
    
    <!-- Attendee list section -->
    <section id="attendee_list" v-show="activeTab === 'attendee_list'">
      <AttendeeCard />
    </section>
    <TerminateButton />
  </div>
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

.text-container {
  flex: 1;
}

.content-container {
  margin: 1rem;
}
.qr-box {
  padding-top: 3rem;
  margin: -1rem;
  width: 100vw; /* Adjust initial width as needed */
  height: 500px; /* Adjust initial height as needed */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%; /* Ensure image shrinks to fit the box */
  max-height: 100%; /* Ensure image shrinks to fit the box */
}
</style>
