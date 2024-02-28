<template>
  <div
    class="container"
    :style="{ width: props.containerWidth, height: props.containerHeight }"
  >
    <div class="slide" :style="backgroundStyle">
      <div class="imageContainer">
        <div class="imageWrapper">
          <img
            class="imageSlide"
            :src="props.images[currentImage]"
            alt="Featured"
          />
        </div>
        <div class="titleBackground">
          <h1 class="imageTitle">{{ props.title[currentImage] }}</h1>
          <button class="button" @click="viewSolo">View Details</button>
        </div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="gradient-overlay-bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentImage = ref(0);

const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(${props.images[currentImage.value]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
});

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: Array,
    required: true,
  },
  id: {
    type: Array,
    required: true,
  },
  containerWidth: {
    type: String,
    default: "100%",
  },
  containerHeight: {
    type: String,
    default: "auto",
  },
  sliderDelay: {
    type: Number,
    default: 10000,
  },
});

function viewSolo() {
  router.push({ name: "View", params: { id: props.id[currentImage.value] } });
}

setInterval(() => {
  currentImage.value = (currentImage.value + 1) % props.images.length;
}, props.sliderDelay);
</script>

<style scoped>
.container {
  position: relative;
}
.slide {
  width: 100%;
  height: 100%;
}
.imageWrapper {
  width: 100%;
  height: 375px;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.5);
}
.imageSlide {
  width: 100%;
  margin-top: -130px;
}
.imageContainer {
  z-index: 1;
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 50px;
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
}
.gradient-overlay {
  position: absolute; /* Position overlay relative to the container */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.5) 30%
  ); /* Fading effect */
}

.gradient-overlay-bottom {
  position: absolute; /* Position overlay relative to the container */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 1) 100%
  ); /* Fading effect */
}
.titleBackground {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0px 0px 25px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.imageTitle {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  text-align: left;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.95);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .imageContainer {
    flex-direction: column;
    height: auto;
    margin-top: 10px;
    width: 100%;
  }
  .imageTitle {
    font-size: 1em;
  }
}
</style>
