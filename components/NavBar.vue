<template>
  <div class="bottom-navbar">
    <NuxtLink to="/home" class="nav-item">
      <Icon name="ic:baseline-home" size="30" />
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/create" class="nav-item">
      <Icon name="ic:baseline-perm-contact-calendar" size="30" />
      <span>Create</span>
    </NuxtLink>
    <NuxtLink to="/join" class="nav-item">
      <Icon name="ic:baseline-qr-code-scanner" size="30" />
      <span>Join</span>
    </NuxtLink>
    <NuxtLink to="/settings" class="nav-item">
      <Icon name="ic:baseline-settings" size="30" />
      <span>Settings</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.bottom-navbar {
  position: fixed; /* Make navbar sticky to bottom */
  bottom: 0; /* Position at bottom of viewport */
  left: 0; /* Start at left edge */
  width: 100%; /* Span entire width */
  display: flex; /* Arrange buttons horizontally */
  justify-content: space-around; /* Distribute buttons evenly */
  background-color: #f0f0f0; /* Background color */
  padding: 1rem; /* Add some padding */
}

.nav-item {
  display: flex; /* Allow icon and text to stack vertically */
  flex-direction: column; /* Stack icon on top, text below */
  align-items: center; /* Center content horizontally */
  text-align: center; /* Center text vertically */
  color: #333; /* Text color */
  text-decoration: none; /* Remove link underline */
  flex: 1; /* Make each button take up 1/4th of the available space */
  position: relative; /* Needed for hover effect */
  overflow: hidden; /* Needed for ripple effect */
  cursor: pointer; /* Indicate clickable behavior */
}

.nav-item:hover {
  background-color: transparent; /* Remove hover background color */
}

.nav-item:hover .ripple {
  /* Ripple effect on hover */
  opacity: 1; /* Make ripple visible */
  transform: scale(1); /* Expand ripple to cover button */
  transition: all 0.4s ease; /* Smooth transition for ripple */
}

.nav-item .ripple {
  /* Base style for ripple element */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0); /* Initial state: hidden circle */
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Ripple color and transparency */
  width: 10px; /* Adjust size as needed */
  height: 10px; /* Adjust size as needed */
  transition: all 0.4s ease; /* Smooth transition for ripple */
}

.nav-item.active .ripple {
  /* Ripple effect on click (active state) */
  opacity: 1; /* Make ripple visible */
  transform: scale(2.5); /* Expand ripple further on click */
  transition: all 0.4s ease; /* Smooth transition for ripple expansion */
}

.nav-item.active {
  /* Active (clicked) state for visual feedback */
  color: #fff; /* Change text color on click */
  background-color: #333; /* Change background color on click */
}

/* Assuming you're using Material Design Icons */
.nav-item i {
  font-size: 24px; /* Adjust icon size as needed */
  margin-bottom: 5px; /* Add spacing between icon and text */
}

/* Import Material Design Icons (or your chosen icon library) */
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
