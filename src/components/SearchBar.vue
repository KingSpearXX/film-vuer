<template>
  <div class="search-bar">
    <button class="search-button">
      <i class="fa fa-home" @click="goHome"></i>
    </button>
    <form @submit="searchSite" @submit.prevent>
      <input
        type="text"
        class="search-input"
        placeholder="Search..."
        v-model="searchQuery"
      />
    </form>
    <button class="search-button">
      <i class="fas fa-search" @click="searchSite"></i>
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");

function goHome() {
  router.push({ name: "Home" });
}
function searchSite() {
  router.push({ name: "Search", query: { q: searchQuery.value } });
}
</script>
<style scoped>
/* Container styling */
form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-bar {
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 5px;
  width: 60%;
  margin: 0 auto;
}

/* Input field styling */
.search-input {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 25px;
  width: 100%;
  font-size: 18px;
}

/* Button styling */
.search-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  padding: 0 10px;
  font-size: 24px;
}

/* Magnifying glass icon styling */
.search-button i {
  font-size: 20px;
}

/* Input focus effect */
.search-input:focus {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .search-bar {
    width: 100%;
    margin: 0 auto;
  }

  .search-input {
    padding: 8px;
  }
}
</style>
