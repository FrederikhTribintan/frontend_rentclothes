<template>
    <div class="p-4">
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <h1 class="text-3xl font-bold mb-4">Edit User</h1>
      <form class="flex flex-col space-y-4" v-if="user" @submit.prevent="updateUser">
        <label class="text-lg font-semibold" for="name">Name:</label>
        <input
          class="border rounded-md p-2"
          v-model="user.name"
          type="text"
          id="name"
          required
        />
        <label class="text-lg font-semibold" for="email">Email:</label>
        <input
          class="border rounded-md p-2"
          v-model="user.email"
          type="email"
          id="email"
          required
        />
        <label class="text-lg font-semibold" for="password">Password:</label>
        <input
          class="border rounded-md p-2"
          v-model="password"
          type="password"
          id="password"
        />
        <label class="text-lg font-semibold" for="address">Address:</label>
        <input
          class="border rounded-md p-2"
          v-model="user.address"
          type="address"
          id="address"
          required
        />
        <button
          class="bg-violet-900 text-white rounded-md py-2 px-4 hover:bg-violet-600 transition-colors"
          type="submit"
        >
          Save Changes
        </button>
      </form>
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
  const user = ref(null);
  const password = ref("");
  
  const goBack = () => {
    router.go(-1);
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      user.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  });
  
  const updateUser = async () => {
    try {
      const updatePayload = {
        name: user.value.name,
        email: user.value.email,
        address: user.value.address,
      };
      if (password.value) {
        updatePayload.password = password.value;
      }
      await axios.put(`http://localhost:8000/api/users/${user.value.id}`, updatePayload, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      router.push(`/user/${user.value.id}`);
    } catch (error) {
      console.error(error);
    }
  };
</script>

  