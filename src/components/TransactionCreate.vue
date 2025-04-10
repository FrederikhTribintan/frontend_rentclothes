<template>
    <!-- A div container with padding of 4 -->
    <div class="p-4">
      <!-- A heading with font size 3xl, bold and margin bottom of 4 -->
      <h1 class="text-3xl font-bold mb-4">Payments</h1>
      <!-- A form that will call createTransaction function on submit -->
      <form @submit.prevent="createTransaction">
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for User dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="user_id" class="block text-gray-700 font-bold mb-2">User:</label>
          <!-- A dropdown for selecting user with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline and required field -->
          <select
            id="user_id"
            v-model="form.user_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <!-- A loop to display the list of users with their names -->
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Product dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="item_id" class="block text-gray-700 font-bold mb-2">Item:</label>
          <!-- A dropdown for selecting product with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, required field and call updateTotalPrice function on change -->
          <select
            id="item_id"
            v-model="form.item_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updateTotalPrice"
          >
            <!-- A loop to display the list of products with their names and prices -->
            <option v-for="item in items" :key="item.id" :value="item.id">{{ item.item_name }}</option>
          </select>
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Quantity input with font color gray, font weight bold and margin bottom of 2 -->
          <label for="quantity" class="block text-gray-700 font-bold mb-2">Payment Method:</label>
          <!-- An input field for entering quantity with type number, shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, required field and call updateTotalPrice function on change -->
          <input
            type="text"
            id="via_transactions"
            v-model="form.via_transactions"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updateTotalPrice"
          />
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Total Price input with font color gray, font weight bold and margin bottom of 2 -->
          <label for="total_price" class="block text-gray-700 font-bold mb-2">Price:</label>
          <!-- An input field for total price with type number, shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, disabled, and required field -->
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updateTotalPrice"
          />
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Status dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="status" class="block text-gray-700 font-bold mb-2">Status:</label>
          <!-- A dropdown for selecting order status with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, and required field -->
          <select
            id="status"
            v-model="form.status"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <!-- Options for order status -->
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <!-- A div container with flexbox layout, items centered and justified space between -->
        <div class="flex items-center justify-between">
          <!-- A button to submit the form with background color blue, font color white, font weight bold, padding top and bottom of 2, padding left and right of 4, rounded corners, focus shadow outline -->
          <button
            type="submit"
            class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
          <!-- A router link to cancel the form with background color gray, font color white, font weight bold, padding top and bottom of 2, padding left and right of 4, rounded corners, focus shadow outline -->
          <router-link
            to="/transaction"
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
    via_transactions: "",
    price: null,
    status: "pending",
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
      console.log(error);
    }
  });
  
  const updateTotalPrice = () => {
  };
  
  const createTransaction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/transactions",
        form.value,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      router.push({ name: "transactionlist", params: { id: response.data.data.id } });
    } catch (error) {
      console.log(error);
    }
  };
  </script>
  