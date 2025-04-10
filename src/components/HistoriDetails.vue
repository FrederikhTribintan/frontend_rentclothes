<template>
    <!-- Render a section containing order details if there is an order object -->
    <div class="p-4" v-if="historis">
      <!-- Button to navigate back to previous page -->
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <!-- Title displaying the user's name and the order details -->
      <h1 class="text-3xl font-bold mb-4">
        {{ historis.user.name }}'s History Details
      </h1>
      <!-- Render the product name for the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Item:</label>
        <p class="text-gray-700 font-semibold">{{ historis.item.item_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Size:</label>
        <p class="text-gray-700 font-semibold">{{ historis.size }}</p>
      </div>
      <!-- Render the dat for the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Rent Date:</label>
        <p class="text-gray-700 font-semibold">{{ historis.rent_date }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Return Date:</label>
        <p class="text-gray-700 font-semibold">{{ historis.return_date }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Payment Method:</label>
        <p class="text-gray-700 font-semibold">{{ historis.via_transactions }}</p>
      </div>
      <!-- Render the total price for the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Price:</label>
        <p class="text-gray-700 font-semibold">
          {{ historis.price }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <router-link
          :to="{ name: 'historiedit', params: { id: historis.id } }"
          class="bg-violet-900 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded
            focus:outline-none focus:shadow-outline"
        >
          Edit
        </router-link>
        <button
          type="button"
          @click="deleteOrder"
          class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useRouter, useRoute } from "vue-router";
  
  // Initialize variables for authentication, routing and order data
  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const historis = ref(null);
  
  // Fetch the order data when the component is mounted
  onMounted(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/historis/${route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      // Set the order data to the fetched data
      historis.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  });
  
  // Define function to delete the current order
  const deleteOrder = async () => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(
          `http://localhost:8000/api/historis/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        // Redirect to the orders page after deleting the order
        router.push({ name: "historilist" });
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  // Define function to navigate back to the previous page
  const goBack = () => {
    router.go(-1);
  };
  </script>
  