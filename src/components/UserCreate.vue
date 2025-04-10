<template>
    <div class="p-4">
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <h1 class="text-3xl font-bold mb-4">Create User</h1>
      <form class="flex flex-col space-y-4" @submit.prevent="createUser">
        <label class="text-lg font-semibold" for="name">Name:</label>
        <input
          class="border rounded-md p-2"
          v-model="name"
          type="text"
          id="name"
          required
        />
        <label class="text-lg font-semibold" for="email">Email:</label>
        <input
          class="border rounded-md p-2"
          v-model="email"
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
          required
          
        />
        <label class="text-lg font-semibold" for="address">Address:</label>
        <input
          class="border rounded-md p-2"
          v-model="address"
          type="address"
          id="address"
          required
        />
        <button
          class="bg-violet-900 text-white rounded-md py-2 px-4 hover:bg-violet-600 transition-colors"
          type="submit"
        >
          Create
        </button>
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
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const address = ref("");
  
  const goBack = () => {
    router.go(-1);
  };

  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        name: name.value,
        email: email.value,
        password: password.value,
        address: address.value,
      }, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      console.log(response.data);
      // reset form
      name.value = "";
      email.value = "";
      password.value = "";
      address.value = "";
      // navigate to user list
      router.push("/user");
    } catch (error) {
      console.error(error);
    }
  };
</script>
