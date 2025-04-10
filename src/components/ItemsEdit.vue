<template>
  <form @submit.prevent="updateItem">
    <div>
        <label class="text-lg font-semibold" for="item_name">Item Name:</label>
        <input
            class="border rounded-md p-2"
            v-model="item.item_name"
            type="text"
            id="item_name"
        />
    </div>
    <div>
        <label class="text-lg font-semibold" for="size">Size:</label>
        <input
            class="border rounded-md p-2"
            v-model="item.size"
            type="text"
            id="size"
        />
    </div>
    <div>
        <label class="text-lg font-semibold" for="price">Price:</label>
        <input
            class="border rounded-md p-2"
            v-model="item.price"
            type="number"
            step="0.01"
            id="price"
        />
    </div>
    <div>
        <label class="text-lg font-semibold" for="status">status:</label>
        <input
            class="border rounded-md p-2"
            v-model="item.status"
            type="text"
            id="status"
        />
    </div>
    <div>
        <label class="text-lg font-semibold" for="image">Image URL:</label>
        <input
            class="border rounded-md p-2"
            v-model="item.image"
            type="text"
            id="image"
        />
    </div>
    <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
        type="submit"
    >
        Save Changes
        
    </button>
</form>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const item = ref({});
onMounted(async () => {
    const response = await axios.get(
        `http://localhost:8000/api/items/${route.params.id}`
    );
    item.value = response.data.data;
});

const updateItem = async () => {
    await axios.put(`http://localhost:8000/api/items/${item.value.id}`, {
        item_name: item.value.item_name,
        size: item.value.size,
        price: item.value.price,
        status: item.value.status,
        image: item.value.image,
    });
    router.push(`/items/${item.value.id}`);
};
const goBack = () => {
    router.go(-1);
  };
</script>

