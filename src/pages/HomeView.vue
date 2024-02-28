<template>
  <FeaturedImage
    :images="topImages"
    :title="topTitle"
    :sliderDelay="sliderDelay"
    :id="topId"
    containerWidth="100%"
    containerHeight="400px"
  />
  <NewReleases />
</template>
<script setup>
import content from "@/services/consumet.js";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "@/store/index.js";
import FeaturedImage from "@/components/FeaturedImage.vue";
import NewReleases from "@/components/NewReleases.vue";

const store = useStore();

const topTitle = ref([]);
const topImages = ref([]);
const topId = ref([]);

const sliderDelay = computed(() => {
  return process.env.VUE_APP_SLIDER_DELAY || 10000;
});

onBeforeMount(async () => {
  store.isLoading = true;
  const req = await content[
    `${process.env.VUE_APP_CONSUMET_PROVIDER}`
  ].getTop();
  topTitle.value = req.results.map((item) => item.title);
  topImages.value = req.results.map((item) => item.image);
  topId.value = req.results.map((item) => item.id);
  store.isLoading = false;
});
</script>
<style></style>
