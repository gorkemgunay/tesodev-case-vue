<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import SortIcon from "@/icons/sort-icon.vue";

interface IProps {
  filter: string;
  updateFilter: (name: string) => void;
}

const props = defineProps<IProps>();

const isShow = ref(false);
const filterRef = ref<HTMLDivElement | null>(null);
const route = useRoute();

const handleChangeFilter = (name: string) => {
  if (props.filter === name) {
    props.updateFilter("");
  } else {
    props.updateFilter(name);
  }
  isShow.value = false;
};

const handleIsShow = () => {
  isShow.value = !isShow.value;
};

const outsideClickHandler = (event: Event) => {
  if (
    filterRef.value &&
    !filterRef.value.contains(event.target as Node | null)
  ) {
    isShow.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", outsideClickHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", outsideClickHandler);
});
</script>

<template>
  <div ref="filterRef" class="filter" @keyup.esc="isShow = false">
    <button class="button" @click="handleIsShow">
      <SortIcon />
      <p>Order By</p>
    </button>
    <div class="filter-types" v-if="isShow">
      <div
        :class="[route.query.filter === 'name-ascending' && 'active']"
        @click="handleChangeFilter('name-ascending')"
      >
        Name ascending
      </div>
      <div
        :class="[route.query.filter === 'name-descending' && 'active']"
        @click="handleChangeFilter('name-descending')"
      >
        Name descending
      </div>
      <div
        :class="[route.query.filter === 'year-ascending' && 'active']"
        @click="handleChangeFilter('year-ascending')"
      >
        Year ascending
      </div>
      <div
        :class="[route.query.filter === 'year-descending' && 'active']"
        @click="handleChangeFilter('year-descending')"
      >
        Year descending
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter {
  position: relative;
  .button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background-color: #f3f2f2;
    outline: 0;
    cursor: pointer;
    p {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-text-secondary);
    }
  }
  .filter-types {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 156px;
    padding: 10px 16px;
    margin-top: 8px;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background: #fff;
    box-shadow: 4px 6px 12px 4px rgba(0, 0, 0, 0.2);
    div {
      font-size: 14px;
      font-weight: 500;
      padding: 8px 8px;
      cursor: pointer;
      &.active {
        color: var(--color-white);
        background-color: #b3b3b3;
        border-radius: 8px;
      }
    }
  }
}
</style>
