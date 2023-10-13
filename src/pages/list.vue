<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/button.vue";
import Input from "@/components/input.vue";
import Filter from "@/components/list/filter.vue";
import Pagination from "@/components/pagination.vue";
import LocationIcon from "@/icons/location-icon.vue";
import { parseDate } from "@/lib/utils";
import { IData } from "@/types/index";

const search = ref("");
const filter = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);

const route = useRoute();
const router = useRouter();

const dataArray = JSON.parse(localStorage.getItem("data") || "") as IData[];

onMounted(() => {
  if (Array.isArray(route.query.search)) {
    search.value = route.query.search[0]?.toString() || "";
  } else {
    search.value = route.query.search?.toString() || "";
  }
  if (Array.isArray(route.query.filter)) {
    filter.value = route.query.filter[0]?.toString() || "";
  } else {
    filter.value = route.query.filter?.toString() || "";
  }
});

const filteredArray = computed(() => {
  const data = dataArray.filter((item) => {
    const term = search.value.toLowerCase().trim();
    if (term.length >= 2) {
      return item.nameSurname.toLowerCase().includes(term);
    }
    return true;
  });

  return data.sort((a, b) => {
    if (filter.value === "name-ascending") {
      return a.nameSurname.localeCompare(b.nameSurname);
    } else if (filter.value === "name-descending") {
      return b.nameSurname.localeCompare(a.nameSurname);
    } else if (filter.value === "year-ascending") {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateA.getTime() - dateB.getTime();
    } else if (filter.value === "year-descending") {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  });
});

const calculateTotalPages = Math.ceil(
  filteredArray.value.length / itemsPerPage.value
);
totalPages.value = calculateTotalPages;

const paginatedArray = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return filteredArray.value.slice(startIndex, endIndex);
});

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  search.value = target.value;
};

const handleFilter = (name: string) => {
  filter.value = name;
};

const handleCurrentPage = (page: number) => {
  currentPage.value = page;
};

const handleNavigate = () => {
  router.push({
    name: "add-link",
  });
};

watch([filter, search], () => {
  const query: { search?: string; filter?: string } = {};

  if (search.value) {
    query.search = search.value;
  } else {
    delete query.search;
  }

  if (filter.value) {
    query.filter = filter.value;
  } else {
    delete query.filter;
  }

  currentPage.value = 1;
  router.replace({ query });
});

watch([filteredArray], () => {
  const calculateTotalPages = Math.ceil(
    filteredArray.value.length / itemsPerPage.value
  );
  totalPages.value = calculateTotalPages;
});
</script>

<template>
  <div class="list-page-wrapper">
    <div class="list-page">
      <header class="header">
        <router-link to="/">
          <img src="/images/tesodev.png" alt="tesodev" />
        </router-link>
        <form class="search-form">
          <div class="input">
            <Input :model-value="search" @update:model-value="handleSearch" />
          </div>
          <Button>Search</Button>
        </form>
        <Button @click="handleNavigate">Add new record</Button>
      </header>
      <div class="content">
        <div class="top">
          <div class="search-results">
            <div
              class="search-data"
              v-for="data in paginatedArray"
              :key="data.id"
            >
              <LocationIcon />
              <div class="search-content">
                <div class="left">
                  <p>{{ data.nameSurname }}</p>
                  <span>{{ data.city }}, {{ data.country }}</span>
                </div>
                <div class="right">
                  <p>{{ data.nameSurname }}</p>
                  <span>{{ data.date }}</span>
                </div>
              </div>
            </div>
          </div>
          <Filter :filter="filter" :updateFilter="handleFilter" />
        </div>
        <div class="bottom">
          <Pagination
            v-if="totalPages > 1"
            :dataPerPage="itemsPerPage"
            :totalPages="totalPages"
            :currentPage="currentPage"
            :setCurrentPage="handleCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-page-wrapper {
  background-color: #fcfcfc;
  width: 100%;
  min-height: 100vh;
  .list-page {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 80px;
      padding: 48px 0;
      img {
        width: 149px;
        height: 63px;
      }
      .search-form {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 24px;
        .input {
          flex: 1;
        }
      }
    }
    .content {
      .top {
        display: flex;
        gap: 24px;
        .search-results {
          flex: 1;
          .search-data {
            position: relative;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            margin-bottom: 20px;
            border-radius: 8px;
            &:hover {
              &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 100%;
                width: calc(100% + 24px);
                background-color: rgba(79, 117, 194, 0.21);
                border-radius: 8px;
              }
              cursor: pointer;
            }
            &:not(:first-child) {
              &::before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: -10px;
                bottom: 100%;
                margin-left: auto;
                margin-right: auto;
                border-top: 1px solid var(--color-border);
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
              .right {
                display: flex;
                flex-direction: column;
                gap: 4px;
                text-align: right;
                p {
                  color: var(--color-text-secondary);
                }
                span {
                  font-weight: 500;
                  color: var(--color-text-secondary);
                }
              }
            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 48px;
        padding-bottom: 48px;
      }
    }
  }
}
</style>
