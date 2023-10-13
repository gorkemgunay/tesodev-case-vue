<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  dataPerPage: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const props = defineProps<IProps>();

const pageNumbers = computed(() => {
  const numbers: Array<any> = [];
  const halfVisible = 2;

  let start = Math.max(props.currentPage - halfVisible, 1);
  let end = Math.min(props.currentPage + halfVisible, props.totalPages);

  if (start > 1) {
    numbers.push(1);
    if (start > 2) {
      numbers.push("...");
    }
  }

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  if (end < props.totalPages) {
    if (end < props.totalPages - 1) {
      numbers.push("...");
    }
    numbers.push(props.totalPages);
  }

  return numbers;
});

const previousPage = () => {
  if (props.currentPage === 1) {
    props.setCurrentPage(1);
  } else {
    props.setCurrentPage(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage === props.totalPages) {
    props.setCurrentPage(props.totalPages);
  } else {
    props.setCurrentPage(props.currentPage + 1);
  }
};
</script>

<template>
  <div class="pagination">
    <button
      class="pagination-button"
      @click="previousPage"
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    <div v-for="(pageNumber, index) in pageNumbers" :key="index">
      <template v-if="pageNumber === '...'">
        <span class="pagination-dot">...</span>
      </template>
      <template v-else>
        <button
          :class="['pagination-page', currentPage === pageNumber && 'active']"
          @click="setCurrentPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </template>
    </div>
    <button
      class="pagination-button"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  .pagination-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 16px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 14px;
    color: var(--color-border);
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    outline: 0;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  .pagination-page {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background-color: var(--color-white);
    min-height: 24px;
    min-width: 24px;
    padding: 4px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    &.active {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
}
</style>
