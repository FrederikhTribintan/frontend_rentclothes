<template>
    <!-- Container with padding of 4 -->
    <div class="p-4">
      <!-- Heading with font size 3xl, bold, and margin bottom of 4 -->
      <h1 class="text-3xl font-bold mb-4">Create Order</h1>
      <!-- Form that will call createHistori function on submit -->
      <form @submit.prevent="createHistori" class="space-y-4">
        <!-- Container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- Label for User dropdown -->
          <label for="user_id" class="block text-gray-700 font-bold mb-2">User:</label>
          <!-- Dropdown for selecting user -->
          <select
            id="user_id"
            v-model="form.user_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <!-- Loop to display the list of users with their names -->
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <!-- Container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- Label for Product dropdown -->
          <label for="item_id" class="block text-gray-700 font-bold mb-2">Item:</label>
          <!-- Dropdown for selecting product -->
          <select
            id="item_id"
            v-model="form.item_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updateTotalPrice"
          >
            <!-- Loop to display the list of products with their names and prices -->
            <option v-for="item in items" :key="item.id" :value="item.id">
              {{ item.item_name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
        <label class="text-lg font-semibold" for="size">Size:</label>
        <input
          class="border rounded-md p-2"
          v-model="form.size"
          type="text"
          id="size"
          required
        />
      </div>
      <div class="mb-4">
        <label for="rent_date" class="block text-gray-700 font-bold mb-2">Rent Date:</label>
        <input
          type="date"
          id="rent_date"
          v-model="form.rent_date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label for="return_date" class="block text-gray-700 font-bold mb-2">Return Date:</label>
        <input
          type="date"
          id="return_date"
          v-model="form.return_date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label for="via_transactions" class="block text-gray-700 font-bold mb-2">Payment Method:</label>
        <input
          type="text"
          id="via_transactions"
          v-model="form.via_transactions"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700 font-bold mb-2">Price:</label>
        <input
          type="number"
          id="price"
          v-model="form.price"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
        <!-- Container with flexbox layout, items centered and justified space between -->
        <div class="flex items-center justify-between">
          <!-- Button to submit the form -->
          <button
            type="submit"
            class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
          <!-- Router link to cancel the form -->
          <router-link
            to="/histori"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  const router = useRouter();
  const authStore = useAuthStore();
  const form = ref({
    user_id: null,
    item_id: null,
    size: "",
    rent_date: "",
    return_date: "",
    price: "",
    
  });
  const users = ref([]);
  const items = ref([]);
  
  onMounted(async () => {
    try {
      const [usersResponse, itemsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
        axios.get("http://localhost:8000/api/items", {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
      ]);
      users.value = usersResponse.data.data;
      items.value = itemsResponse.data.data;
    } catch (error) {
      console.error(error);
    }
  });
  
  const updateTotalPrice = () => {
  };
  
  const createHistori = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/historis", form.value, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      router.push({ name: "historilist", params: { id: response.data.data.id } });
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  