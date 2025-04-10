<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Item Details</h1>
      <div v-if="item" class="bg-white shadow-md p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">{{ item.item_name }}</h3>
        <p class="text-gray-700 mb-2">Size: {{ item.size }}</p>
        <p class="text-gray-700 mb-2">Price: ${{ item.price }}</p>
        <p class="text-gray-700 mb-2">Status: {{ item.status }}</p>
        <img :src="item.image" alt="Item Image" class="mt-4 rounded-lg shadow-md">
        <div class="mt-4 flex items-center space-x-4">
          <router-link :to="`/items/${item.id}/edit`" class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit
          </router-link>
          <button @click="deleteItem" class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete
          </button>
        </div>
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
  const item = ref(null);
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/items/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      item.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  });
  
  const deleteItem = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8000/api/items/${item.value.id}`, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
</script>

  