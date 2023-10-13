<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
import SearchIcon from "@/icons/search-icon.vue";
import LocationIcon from "@/icons/location-icon.vue";
import { IData } from "@/types/index";

const search = ref("");
const router = useRouter();

const dataArray = JSON.parse(localStorage.getItem("data") || "") as IData[];

const filteredArray = computed(() => {
  const data = dataArray.filter((item) => {
    const term = search.value.toLowerCase().trim();
    if (term.length >= 2) {
      return item.nameSurname.toLowerCase().includes(term);
    }
  });
  return data.slice(0, 3);
});

const handleSubmit = () => {
  if (search.value) {
    router.push({
      name: "list",
      query: { search: search.value },
    });
  } else {
    router.push({ name: "list" });
  }
};
</script>

<template>
  <div class="search">
    <h2>Find in records</h2>
    <form class="search-form" @submit.prevent="handleSubmit">
      <div class="input">
        <Input
          :model-value="search"
          @update:model-value="(e) => (search = e.target.value)"
          :icon-left="SearchIcon"
        />
        <div class="search-results" v-if="filteredArray.length > 0">
          <div class="search-data" v-for="data in filteredArray" :key="data.id">
            <LocationIcon />
            <div class="search-content">
              <div class="left">
                <p>{{ data.nameSurname }}</p>
                <span>{{ data.city }}, {{ data.country }}</span>
              </div>
            </div>
          </div>
          <router-link
            :to="{ name: 'list', query: { search } }"
            class="show-more"
            >Show more...</router-link
          >
        </div>
      </div>
      <Button>Search</Button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  h2 {
    font-size: 32px;
    font-weight: 700;
  }
  .search-form {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    .input {
      position: relative;
      flex: 1;
    }
    .search-results {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: -24px;
      top: calc(100% + 16px);
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: 20px;
      padding: 20px 24px;
      background-color: var(--color-white);
      .search-data {
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
        height: 60px;
        &:not(:first-child) {
          &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
            border-top: 1px solid #f2f4f5;
          }
        }
        .search-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .left {
            display: flex;
            flex-direction: column;
            gap: 4px;
            span {
              color: var(--color-text-secondary);
              font-size: 14px;
            }
          }
        }
      }
      .show-more {
        font-weight: 700;
        color: var(--color-text-primary);
        text-align: center;
      }
    }
  }
}
</style>
