<template>
    <div class="p-4">
      <!-- Header section with title and "Create a new order" button that links to the create order page -->
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Rent List</h1>
        <router-link
          to="/rent/create"
          class="bg-violet-900 text-white rounded-md py-2 px-4 inline-block hover:bg-violet-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Create a new Rent
        </router-link>
      </header>
      <!-- Order grid section that loops through orders and displays each order's details -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="rent in rents" :key="rent.id" class="bg-white rounded-lg p-4 shadow-md">
          <!-- Order product name -->
          <h3 class="text-xl font-bold mb-2">{{ rent.item.item_name }}</h3>
          <div class="text-sm mb-2">
            
            <!-- Order status -->
            <p class="text-gray-500 mb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-1.5"
              >
                <!-- SVG Path -->
              </svg>
              Status: {{ rent.status }}
            </p>
            <!-- Order user name -->
            <p class="text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-1.5"
              >
              </svg>
              Ordered by: {{ rent.user.name }}
            </p>
          </div>
          <!-- Order total price -->
       
          <!-- View order details button that links to the order details page -->
          <router-link
            :to="`/rent/${rent.id}`"
            class="bg-violet-900 text-white rounded-md py-2 px-4 mt-4 inline-block hover:bg-violet-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
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
  const rents = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rents", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      rents.value = response.data.data;
    } catch (error) {
      console.error("Error fetching rents:", error);
    }
  });
  </script>
  