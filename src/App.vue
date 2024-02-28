<template>
  <LoaderScreen v-if="isLoading" />
  <SearchBar />
  <RouterView v-slot="{ Component, route }">
    <Component :is="Component" :key="route.fullPath" />
  </RouterView>
</template>

<script setup>
import LoaderScreen from "./components/LoaderScreen.vue";
import SearchBar from "./components/SearchBar.vue";
import { useStore } from "./store/index.js";
import { computed } from "vue";

const store = useStore();

const isLoading = computed(() => store.isLoading);
</script>

<style>
body {
  background-color: black;
  font-family: Arial, Helvetica, sans-serif;
}
button {
  background-color: rgb(0, 158, 206);
  color: white;
  font-size: 1em;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
}

@media (max-width: 600px) {
  button {
    padding: 5px 10px;
    font-size: 0.8em;
  }
}
</style>
