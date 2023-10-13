<script setup lang="ts">
import { onMounted } from "vue";
import { getRandomDate } from "@/lib/utils";
import data from "@/data/index.json";

onMounted(() => {
  const getDataFromLocalStorage = localStorage.getItem("data");

  if (!getDataFromLocalStorage) {
    const properData = data.data.map((item) => {
      return {
        id: item[0],
        nameSurname: item[1],
        company: item[2],
        email: item[3],
        phone: item[4],
        website: item[5],
        country: item[6],
        city: item[7],
        date: getRandomDate(),
      };
    });

    localStorage.setItem("data", JSON.stringify(properData));
  }
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
