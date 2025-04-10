<template>
    <!-- Render a section containing transaction details if there is an transaction object -->
    <div class="p-4" v-if="transaction">
      <!-- Button to navigate back to previous page -->
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <!-- Title displaying the user's name and the transaction details -->
      <h1 class="text-3xl font-bold mb-4">
        {{ transaction.user.name }}'s Payments Details
      </h1>
      <!-- Render the product name for the transaction -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Product:</label>
        <p class="text-gray-700 font-semibold">{{ transaction.item.item_name }}</p>
      </div>
      <!-- Render the quantity for the transaction -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Payment Method:</label>
        <p class="text-gray-700 font-semibold">{{ transaction.via_transactions }}</p>
      </div>
      <!-- Render the total price for the transaction -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Price:</label>
        <p class="text-gray-700 font-semibold">
          {{ transaction.price}}
        </p>
      </div>
      <!-- Render the status of the transaction -->
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Status:</label>
        <p class="text-gray-700 font-semibold">{{ transaction.status }}</p>
      </div>
      <!-- Render edit and delete buttons for the transaction -->
      <div class="flex items-center justify-between">
        <router-link
          :to="{ name: 'transactionedit', params: { id: transaction.id } }"
          class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </router-link>
        <button
          type="button"
          @click="deleteTransaction"
          class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, computed, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { useRouter, useRoute } from "vue-router";
  
  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const transaction = ref(null);
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transactions/${route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      transaction.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  });
  
  const deleteTransaction = async () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(
          `http://localhost:8000/api/transactions/${transaction.value.id}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        router.push({name :"transactionlist"});
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  