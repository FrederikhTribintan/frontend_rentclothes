<template>
  <!-- Navigation bar -->
  <nav v-if="authStore.isLoggedIn" class="bg-gray-800 p-4 px-8 flex">
   <h1 class="text-white hover:text-gray-200 transition-colors mr-4">RENT CLOTHES</h1>
    <!-- Home link -->
    <div class="flex justify-between">
    <RouterLink to="/" class="text-white hover:text-gray-200 transition-colors">Item</RouterLink>
    <!-- Users link -->
    <RouterLink to="/user" class="ml-4 text-white hover:text-gray-200 transition-colors">Users</RouterLink>
    <RouterLink to="/rent" class="ml-4 text-white hover:text-gray-200 transition-colors">Rent</RouterLink>
    <RouterLink to="/transaction" class="ml-4 text-white hover:text-gray-200 transition-colors">Payments</RouterLink>
    <RouterLink to="/histori" class="ml-4 text-white hover:text-gray-200 transition-colors">History</RouterLink>
  </div>
    <!-- Logout button -->
    <button @click="logout" class="ml-auto text-white hover:text-gray-200 transition-colors">Logout</button>
  </nav>
  
  <div class="p-4">
    <!-- Render the current route -->
    <RouterView />
  </div>
</template>

<script setup>
// Import hooks from Vuex and Vue Router
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
// Initialize objects
const authStore = useAuthStore();
const router = useRouter();
// Define logout method
const logout = () => {
  authStore.logout(); // Clear authentication state
  router.push({ name: "login" }); // Redirect to login route
};
</script>

<style scoped>
/* Styling navigation bar */
nav {
  background-color: #3a0069;
  padding: 1rem 2rem;
  display: flex;
}
nav h1{
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  font-weight: bold; /* Membuat teks tebal */
  font-size: 1.2rem; /* Menentukan ukuran teks */
  display: flex; /* Menjadikan link flex items */
  align-items: center; /* Mengatur posisi vertikal ke tengah */
}

/* Styling navigation links */
nav a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: bold; /* Membuat teks tebal */
  font-size: 1.2rem; /* Menentukan ukuran teks */
  display: flex; /* Menjadikan link flex items */
  align-items: center; /* Mengatur posisi vertikal ke tengah */
}

nav a:hover {
  color: #d1d5db;
}

/* Styling logout button */
nav button {
  margin-left: auto;
  color: white;
  transition: color 0.3s;
  font-weight: bold; /* Membuat teks tebal */
  font-size: 1.2rem; /* Menentukan ukuran teks */
}

nav button:hover {
  color: #d1d5db;
}

/* Styling main content area */
main {
  padding: 1rem;
}

/* Additional styling for readability */
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  margin: 0;
}
</style>

