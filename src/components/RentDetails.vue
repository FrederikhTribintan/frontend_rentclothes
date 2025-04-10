<template>
    <div class="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg" v-if="rent">
      <!-- Button to navigate back to the previous page -->
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <!-- Title displaying the user's name and the order details -->
      <h1 class="text-3xl font-bold mb-4 text-gray-800">
        {{ rent.user.name }}'s Order Details
      </h1>
      <!-- Render the product name for the order -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Product:</label>
        <p class="text-gray-700 font-semibold">{{ rent.item.item_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Rent Date:</label>
        <p class="text-gray-700 font-semibold">{{ rent.rent_date }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Return Date:</label>
        <p class="text-gray-700 font-semibold">{{ rent.return_date }}</p>
      </div>
      <!-- Render edit and delete buttons for the order -->
      <div class="flex items-center justify-start">
        <router-link
          :to="{ name: 'rentedit', params: { id: rent.id } }"
          class="bg-violet-900 hover:bg-violet-700 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </router-link>
        <button
          type="button"
          @click="deleteRent"
          class="bg-violet-500 hover:bg-violet-700 text-white font-bold  mx-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const rent = ref(null);
  
  const goBack = () => {
    router.go(-1);
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/rents/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      rent.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  });
  
  const deleteRent = async () => {
    if (confirm("Are you sure you want to delete this rent?")) {
      try {
        await axios.delete(`http://localhost:8000/api/rents/${rent.value.id}`, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        });
        router.push("/rent");
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>
  