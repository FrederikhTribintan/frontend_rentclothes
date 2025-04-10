<template>
    <div class="p-4">
      <!-- Header section with title and "Create a new order" button that links to the create order page -->
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">History List</h1>
        <router-link
          to="/histori/create"
          class="bg-violet-900 text-white rounded-md py-2 px-4 inline-block hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Create a History
        </router-link>
      </header>
      <!-- Order grid section that loops through orders and displays each order's details -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="histori in historis"
          :key="histori.id"
          class="bg-white rounded-lg p-4 shadow-md"
        >
          <!-- Order product name -->
          <h3 class="text-xl font-bold mb-2">{{ histori.user.name }} 
          </h3>
          <p>History Transaction</p>
          
          <router-link
            :to="`/histori/${histori.id}`"
            class="bg-violet-900 text-white rounded-md py-2 px-4 mt-4 inline-block
            hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue
            300 focus:ring-opacity-50"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";

  const authStore = useAuthStore();
  const historis = ref([]);
 
  onMounted(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/historis", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      historis.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  
  <style></style>
  