<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Create Item</h1>
      <form @submit.prevent="createItem" class="space-y-4">
        <div>
          <label for="item-name" class="text-lg font-semibold">Item Name:</label>
          <input v-model="item_name" type="text" id="item_name" class="border rounded-md p-2 w-full" required />
        </div>
        <div>
          <label for="size" class="text-lg font-semibold">Size:</label>
          <input v-model="size" type="text" id="size" class="border rounded-md p-2 w-full" required />
        </div>
        <div>
          <label for="price" class="text-lg font-semibold">Price:</label>
          <input v-model="price" type="number" id="price" step="0.01" class="border rounded-md p-2 w-full" required />
        </div>
        <div>
          <label for="status" class="text-lg font-semibold">Status:</label>
          <input v-model="status" type="text" id="status" class="border rounded-md p-2 w-full" required />
        </div>
        <div>
          <label for="image" class="text-lg font-semibold">Image URL:</label>
          <input v-model="image" type="text" id="image" class="border rounded-md p-2 w-full" required />
        </div>
        <button type="submit" class="bg-violet-900 text-white rounded-md py-2 px-4 hover:bg-violet-600 transition-colors">Create</button>
        <router-link
            to="/"
            class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </router-link>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  const authStore = useAuthStore();
  const router = useRouter();
  const item_name = ref("");
  const size = ref("");
  const price = ref("");
  const status = ref("");
  const image = ref("");
  
  const createItem = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/items", {
      item_name: item_name.value,
      size: size.value,
      price: price.value,
      status: status.value,
      image: image.value,
    }, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    console.log(response.data);

    item_name.value = "";
    size.value = "";
    price.value = "";
    status.value = "";
    image.value = "";

    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
  </script>
  