<template>
  <div class="container">
    <div class="slide">
      <div class="titleBar">
        <h1>New Releases</h1>
      </div>
      <div class="contentContainer">
        <div v-for="release in releases" :key="release.id" class="content">
          <h3 class="episodeNumber">Episode: {{ release.episodeNumber }}</h3>
          <img :src="release.image" alt="Album cover" class="episodeImage" />
          <div class="episodeData">
            <button @click="viewSolo(release.id, release.episodeNumber)">
              Watch
            </button>
            <h1>{{ release.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import content from "@/services/consumet.js";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const releases = ref([]);

function viewSolo(id, epNum) {
  router.push({ name: "View", params: { id }, query: { ep: epNum } });
}

onBeforeMount(async () => {
  const req = await content[
    `${process.env.VUE_APP_CONSUMET_PROVIDER}`
  ].getReleases();
  releases.value = req.results;
});
</script>

<style scoped>
.container {
  width: 60%;
  height: 100%;
  margin: 0 auto;
}
.contentContainer {
  display: flex;
  justify-content: space-between;
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
.episodeNumber {
  z-index: 1;
  position: relative;
  color: white;
  font-size: 1em;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: -20px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.95);
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
.titleBar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(0, 158, 206);
  border-radius: 0px 0px 25px 0px;
  padding: 5px;
}
.titleBar h1 {
  color: white;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}
/* Responsive adjustments */
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
  .contentContainer {
    padding: 0px;
  }
}
</style>
