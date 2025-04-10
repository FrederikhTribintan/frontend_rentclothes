<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Item List</h1>
      <router-link to="/create" class="inline-block mb-4 px-4 py-2 bg-violet-900 text-white rounded hover:bg-violet-600 transition-colors">Create a new product</router-link>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow-md overflow-hidden p-4">
          <h3 class="text-xl font-bold mb-2">{{ item.item_name }}</h3>
          <p class="text-gray-700 mb-2">Size: {{ item.size }}</p>
          <p class="text-gray-700 mb-2">Price: {{ item.price }}</p>
          <p class="text-gray-700 mb-2">Status: {{ item.status }}</p>
          <router-link :to="`/items/${item.id}`" class="block bg-violet-900 hover:bg-violet-600 text-white rounded-md py-2 px-4 transition-colors">View Details</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth";
  
  const authStore = useAuthStore();
  const items = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/items", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      items.value = response.data.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  });
  </script>
  <style scoped>
  /* Styling heading */
  h1 {
    color: #3d007a; /* Warna ungu */
    font-size: 2rem; /* Ukuran teks */
    font-weight: bold; /* Tebal */
    margin-bottom: 1rem; /* Jarak bawah */
  }
  
  /* Styling "Create a new product" button */
  .router-link {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #6c63ff; /* Warna ungu */
    color: white;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }
  
  .router-link:hover {
    background-color: #5a4bb7; /* Warna ungu lebih gelap saat dihover */
  }
  
  /* Styling item cards */
  .item-card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
  
  .item-card h3 {
    font-size: 1.5rem; /* Ukuran teks */
    font-weight: bold; /* Tebal */
    margin-bottom: 0.5rem; /* Jarak bawah */
  }
  
  .item-card p {
    margin-bottom: 0.5rem; /* Jarak bawah */
  }
  
  /* Styling "View Details" button */
  .view-details-button {
    display: block;
    background-color: #3a007c; /* Warna ungu */
    color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
  }
  
  .view-details-button:hover {
    background-color: #5a4bb7; /* Warna ungu lebih gelap saat dihover */
  }
  </style>
    
  