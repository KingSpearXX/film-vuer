<template>
  <div class="container">
    <h1>Search results for:</h1>
    <h1 class="searchQuery">{{ searchQuery }}</h1>
    <h1 v-if="results.length == 0">No Results Found.</h1>
    <div class="contentContainer">
      <div v-for="result in results" :key="result.id" class="content">
        <img :src="result.image" alt="Album cover" class="episodeImage" />
        <div class="episodeData">
          <button @click="viewSolo(result.id)">Watch</button>
          <h1>{{ result.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store/index.js";
import content from "@/services/consumet";

const results = ref([]);
const store = useStore();
const route = useRoute();
const router = useRouter();
const searchQuery = route.query.q;

function viewSolo(id) {
  router.push({ name: "View", params: { id } });
}

onBeforeMount(async () => {
  store.isLoading = true;
  const req = await content[`${process.env.VUE_APP_CONSUMET_PROVIDER}`].search(
    searchQuery
  );
  results.value = req.results;
  store.isLoading = false;
});
</script>
<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
  color: white;
}
.searchQuery {
  font-size: 1.5em;
  margin-top: -20px;
  color: rgb(0, 158, 206);
}
.contentContainer {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  flex-wrap: wrap;
}
.content {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.episodeImage {
  width: 150px;
  height: 220px;

  border-radius: 10px;
}
.episodeData {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -10px;
}
.episodeData h1 {
  margin-top: 10px;
  padding: 0;
  font-size: 0.8em;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .container {
    width: 100%;
    padding: 10px;
  }
  .contentContainer {
    padding: 10px;
  }
}
</style>
