<template>
  <div class="image-carousel-container">
    <div class="carousel-main">
      <div :class="['carousel-image-wrapper', direction]">
        <img 
          :key="currentIndex"
          :src="images[currentIndex]" 
          :alt="`Slide ${currentIndex + 1}`"
          class="carousel-image"
        />
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        class="carousel-arrow carousel-arrow-left"
        @click="goToPrevious"
        aria-label="Previous image"
        title="Previous"
      >
        ❮
      </button>
      <button 
        class="carousel-arrow carousel-arrow-right"
        @click="goToNext"
        aria-label="Next image"
        title="Next"
      >
        ❯
      </button>
    </div>

    <!-- Center Info -->
    <div v-if="centers && centers[currentIndex]" class="carousel-info">
      <h4>{{ centers[currentIndex].title }}</h4>
      <p>{{ centers[currentIndex].desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  centers: {
    type: Array,
    default: null,
  },
});

const currentIndex = ref(0);
const direction = ref("next");

const goToPrevious = () => {
  direction.value = "prev";
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1;
};

const goToNext = () => {
  direction.value = "next";
  currentIndex.value = currentIndex.value === props.images.length - 1 
    ? 0 
    : currentIndex.value + 1;
};
</script>
