<script setup lang="ts">
import { ref, watch } from "vue";
import ArrowLeftIcon from "@/icons/arrow-left-icon.vue";
import ArrowRightIcon from "@/icons/arrow-right-icon.vue";

const imagesData = [
  {
    id: 1,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
  {
    id: 2,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
  {
    id: 3,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
  {
    id: 4,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
  {
    id: 5,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
  {
    id: 6,
    imageSrc: "/images/slider-image.png",
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    date: "1h ago",
    author: "Troy Corlson",
  },
];

const currentIndex = ref(0);
const imageSliderRef = ref<HTMLDivElement | null>(null);
const maxSteps = imagesData.length - 3;

watch(currentIndex, () => {
  if (imageSliderRef.value) {
    imageSliderRef.value.scrollLeft = (327 + 24) * currentIndex.value;
  }
});

const handleNext = () => {
  if (currentIndex.value === maxSteps) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

const handlePrevious = () => {
  if (currentIndex.value <= 0) {
    currentIndex.value = maxSteps;
  } else {
    currentIndex.value--;
  }
};
</script>

<template>
  <div class="top-news">
    <h2>Top News</h2>
    <div class="image-slider-wrapper">
      <ArrowLeftIcon class="slider-handler left" @click="handlePrevious" />
      <div ref="imageSliderRef" class="image-slider">
        <div class="image" v-for="image in imagesData" :key="image.id">
          <img :src="image.imageSrc" :alt="image.title" />
          <h3>{{ image.title }}</h3>
          <div>
            <p>{{ image.date }}</p>
            <span>·</span>
            <p>{{ image.author }}</p>
          </div>
        </div>
      </div>
      <ArrowRightIcon class="slider-handler right" @click="handleNext" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-news {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 180px;
  width: 1029px;
  margin-left: auto;
  margin-right: auto;
  h2 {
    font-size: 32px;
    font-weight: 700;
  }
  .image-slider-wrapper {
    position: relative;
    .slider-handler {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      &.left {
        left: -64px;
      }
      &.right {
        right: -64px;
      }
    }
    .image-slider {
      display: flex;
      align-items: center;
      gap: 24px;
      overflow-y: scroll;
      scroll-behavior: smooth;
      width: 1029px;
      .image {
        img {
          width: 327px;
          height: 195px;
        }
        h3 {
          font-size: 16px;
          font-weight: 700;
          margin-top: 12px;
          margin-bottom: 8px;
        }
        div {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          p {
            color: var(--color-text-secondary);
          }
          span {
            color: var(--color-text-secondary);
          }
        }
      }
    }
  }
}
</style>
