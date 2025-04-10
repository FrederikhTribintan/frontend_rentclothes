<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Update Payments</h1>
      <form @submit.prevent="updateTransaction">
        <div class="mb-4">
          <label for="user_id" class="block text-gray-700 font-bold mb-2">User:</label>
          <select
            id="user_id"
            v-model="form.user_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="item_id" class="block text-gray-700 font-bold mb-2">Item:</label>
          <select
            id="item_id"
            v-model="form.item_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updatetransaction"
          >
            <option v-for="item in items" :key="item.id" :value="item.id">{{ item.item_name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="transaction_date" class="block text-gray-700 font-bold mb-2">Payment Method:</label>
          <input
            type="text"
            id="via_transactions"
            v-model="form.via_transactions"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updatetransaction"
          />
        </div>
        <div class="mb-4">
          <label for="transaction_date" class="block text-gray-700 font-bold mb-2">Price:</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updatetransaction"
          />
        </div>
        <div class="mb-4">
          <label for="status" class="block text-gray-700 font-bold mb-2">Status:</label>
          <select
            id="status"
            v-model="form.status"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updatetransaction"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
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
  import { ref, onMounted, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  
  const transaction = ref(null);
  const form = ref({
    user_id: null,
    item_id: null,
    via_transactions: "",
    price: null,
    status: "",
  });
  const users = ref([]);
  const items = ref([]);
  const formErrors = ref({});
  
  // Fetch the order data on component mount
  onMounted(async () => {
    const transactionId = route.params.id;
    try {
      const response = await axios.get(`http://localhost:8000/api/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      transaction.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
    
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
  
  // Define a computed property to map the order data to the form object
  const mappedForm = computed(() => {
    if (!transaction.value) {
      return form.value;
    }
    return {
      user_id: transaction.value.user.id,
      item_id: transaction.value.item.id,
      via_transactions: transaction.value.via_transactions,
      price: transaction.value.price,
      status: transaction.value.status,
    };
  });
  
  async function updateTransaction() {
    try {
      const response = await axios.put(`http://localhost:8000/api/transactions/${transaction.value.id}`, form.value, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      transaction.value = response.data.data;
      router.push({ name: "transactionlist" });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        formErrors.value = error.response.data.errors;
      } else {
        console.error(error);
      }
    }
  }
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
