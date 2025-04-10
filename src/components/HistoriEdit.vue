<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Update Payment</h1>
    <form @submit.prevent="updateHistori">
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
        >
          <option v-for="item in items" :key="item.id" :value="item.id">{{ item.item_name }}</option>
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
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </button>
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
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();


const histori = ref(null);
const form = ref({
  user_id: null,
  item_id: null,
  size: "",
  rent_date: "",
  return_date: "",
  via_transactions: "",
  price: null,
});
const users = ref([]);
const items = ref([]);

// Fetch the histori data on component mount
onMounted(async () => {
  const historiId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:8000/api/historis/${historiId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    histori.value = response.data.data;
    form.value = {
      user_id: histori.value.user.id,
      item_id: histori.value.item.id,
      size: histori.value.size,
      rent_date: histori.value.rent_date,
      return_date: histori.value.return_date,
      via_transactions: histori.value.via_transactions,
      price: histori.value.price,
    };
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

async function updateHistori() {
  try {
    const response = await axios.put(`http://localhost:8000/api/historis/${histori.value.id}`, form.value, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });
    histori.value = response.data.data;
    router.push({ name: "historilist" });
  } catch (error) {
    console.error(error);
  }
}

const goBack = () => {
  router.go(-1);
};
</script>
