<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-gray-700">
        <div class="flex items-center justify-center">
          <svg class="w-[50px] h-[50px] fill-[#8e8e8e]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M151.2 69.7l55.9 167.7-11 33.1c-2.7 8.2-4.1 16.7-4.1 25.3V464c0 14.5 3.9 28.2 10.7 39.9C195 509 185.9 512 176 512H48c-26.5 0-48-21.5-48-48V270.5c0-9.5 2.8-18.7 8.1-26.6l47.9-71.8c5.3-7.9 8.1-17.1 8.1-26.6V128 54.3 48C64 21.5 85.5 0 112 0h4.5c.2 0 .4 0 .6 0c.4 0 .8 0 1.2 0c18.8 0 34.1 9.7 44.1 18.8C171.6 27.2 190.8 40 224 40s52.4-12.8 61.7-21.2C295.7 9.7 311 0 329.7 0c.4 0 .8 0 1.2 0c.2 0 .4 0 .6 0H336c26.5 0 48 21.5 48 48v6.3V128v17.5c0 9.5 2.8 18.7 8.1 26.6l47.9 71.8c5.3 7.9 8.1 17.1 8.1 26.6V464c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V295.8c0-5.2 .8-10.3 2.5-15.2L296.8 69.7C279.4 79.7 255.4 88 224 88s-55.4-8.3-72.8-18.3zM96 456a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM63.5 255.5c-4.7 4.7-4.7 12.3 0 17L79 288 63.5 303.5c-4.7 4.7-4.7 12.3 0 17s12.3 4.7 17 0L96 305l15.5 15.5c4.7 4.7 12.3 4.7 17 0s4.7-12.3 0-17L113 288l15.5-15.5c4.7-4.7 4.7-12.3 0-17s-12.3-4.7-17 0L96 271 80.5 255.5c-4.7-4.7-12.3-4.7-17 0zM304 280v8 32c0 8.8 7.2 16 16 16h32 8c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v-8c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path>
          </svg><br>
          <h2 class="text-2xl font-bold">RENT CLOTHES</h2>
        </div>
        <div v-if="errorMessage">
          <p class="bg-red-100 text-red-700 rounded-lg p-4">{{ errorMessage }}</p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                v-model="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                focus:outlinenone focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2
                border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outlinenone focus:ring-blue-500 focus:border-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md text-white bg-violet-900 hover:bg-violet-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const email = ref("");
  const password = ref("");
  const errorMessage = ref(null);
  
  async function onSubmit() {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email.value,
        password: password.value,
      });
      authStore.setAccessToken(response.data.access_token);
      console.log("Login successful");
      router.push({ name: "home" });
    } catch (error) {
      if (
        error.response &&
        error.response.status === 422 &&
        error.response.data.errors &&
        error.response.data.errors.email
      ) {
        errorMessage.value = error.response.data.errors.email[0];
      } else {
        errorMessage.value = "An error occurred: " + error.message;
      }
      console.error(errorMessage.value);
    }
  }
  </script>
  
  <style>
  /* styles here */
  </style>
  