<template>
  <div class="container">
    <div v-for="content in data" :key="content.id" class="contentContainer">
      <div>
        <h1 class="title">{{ content.title }}</h1>
        <p class="eptitle">Episode:{{ curEp }}</p>
        <p class="subtitle">{{ content.type }}</p>
      </div>
      <div class="content">
        <img :src="content.image" alt="Album cover" class="episodeImage" />
        <div class="videoSection">
          <video id="video" controls style="width: 100%"></video>
          <div>
            <h1 class="episodeTitle">Episode List</h1>
            <div class="episodes">
              <button
                v-for="episode in episodes"
                :key="episode.id"
                @click="viewEpisode(episode.number)"
              >
                {{ episode.number }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import content from "@/services/consumet.js";
import { useStore } from "@/store/index.js";
import Hls from "hls.js";

const store = useStore();
const router = useRouter();
const data = ref([]);
const episodes = ref([]);
const id = router.currentRoute.value.params.id;
const curEp = ref("");
const ep =
  router.currentRoute.value.params.ep || router.currentRoute.value.query.ep;
const epId = ref(null);
const watchLink = ref(null);

const initPlayer = () => {
  if (Hls.isSupported()) {
    const video = document.getElementById("video");
    const hls = new Hls();
    hls.loadSource(watchLink.value.url);
    hls.attachMedia(video);
  }
};

function viewEpisode(number) {
  router.push({ name: "View", params: { id }, query: { ep: number } });
}

onBeforeMount(async () => {
  store.isLoading = true;
  const req = await content[
    `${process.env.VUE_APP_CONSUMET_PROVIDER}`
  ].getDetails(id);
  data.value.push(req);
  episodes.value = req.episodes;
  if (ep) {
    req.episodes.forEach((episode) => {
      if (episode.number === parseInt(ep)) {
        epId.value = episode.id;
      }
    });
  } else {
    req.episodes.forEach((episode) => {
      if (episode.number === 1) {
        epId.value = episode.id;
      }
    });
  }
  if (epId.value) {
    const req = await content[
      `${process.env.VUE_APP_CONSUMET_PROVIDER}`
    ].getStreamingLink(epId.value);
    const getDefault = req.sources.find(
      (source) => source.quality === "default"
    );
    watchLink.value = getDefault;
    curEp.value = ep || 1;
  }
  initPlayer();
  store.isLoading = false;
});
</script>

<style scoped>
.episodeTitle {
  font-size: 1.5em;
  color: white;
  margin-top: 20px;
}
.videoSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.video-js {
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.75);
  border-radius: 10px;
}
.episodes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 5px;
}
.episodes button {
  font-size: 0.8em;
  padding: 10px;
  width: 50px;
}
.container {
  width: 60%;
  margin: 0 auto;
  color: white;
}
.title {
  font-size: 2em;
  color: rgb(0, 158, 206);
}
.eptitle {
  margin-top: -20px;
  font-size: 1.5em;
  font-weight: bolder;
}
.subtitle {
  margin-top: -20px;
  font-size: 0.8em;
}
.contentContainer {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  flex-wrap: wrap;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
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
  .content {
    align-items: center;
    flex-direction: column-reverse;
  }
  .episodeImage {
    width: 90%;
    height: auto;
    border-radius: 10px;
  }
  .container {
    width: 100%;
    padding: 0px;
  }
  .contentContainer {
    padding: 0px;
  }
}
</style>
