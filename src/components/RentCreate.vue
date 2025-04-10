<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Create Order</h1>
      <form @submit.prevent="createRent">
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
            @change="updateRent"
          >
            <option v-for="item in items" :key="item.id" :value="item.id">
              {{ item.item_name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
        <label for="rent_date" class="block text-gray-700 font-bold mb-2">Rent Date:</label>
        <input
          type="date"
          id="rent_date"
          v-model="form.rent_date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          @change="updateRent"
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
          @change="updateRent"
        />
      </div>
      <div class="mb-4">
        <label for="status" class="block text-gray-700 font-bold mb-2">Status:</label>
        <select
          id="status"
          v-model="form.status"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          @change="updateRent"
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
          class="bg-violet-900 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
        <router-link
          to="/orders"
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
  rent_date: null,
  return_date: null,
  status: "",
});
const users = ref([]);
const items = ref([]);

onMounted(async () => {
  try {
    const [usersResponse, itemsResponse] = await Promise.all([
      axios.get("http://localhost:8000/api/users", { headers: { Authorization: `Bearer ${authStore.accessToken}` }}),
      axios.get("http://localhost:8000/api/items", { headers: { Authorization: `Bearer ${authStore.accessToken}` }}),
    ]);
    users.value = usersResponse.data.data;
    items.value = itemsResponse.data.data;
  } catch (error) {
    console.log(error);
  }
});

const updateRent = () => {
};

const createRent = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/rents", form.value, { headers: { Authorization: `Bearer ${authStore.accessToken}` }});
    router.push({ name: "rentlist", params: { id: response.data.data.id } });
  } catch (error) {
    console.log(error);
  }
};
</script>