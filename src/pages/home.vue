<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "@/components/button.vue";
import Footer from "@/components/footer.vue";
import Search from "@/components/home/search.vue";
import ImageSlider from "@/components/home/image-slider.vue";

const router = useRouter();

const handleNavigate = () => {
  router.push({
    name: "add-link",
  });
};
</script>

<template>
  <div class="home-page-wrapper">
    <main class="home-page">
      <div class="header">
        <div>
          <Button @click="handleNavigate">Add new record</Button>
        </div>
      </div>
      <div class="content">
        <div class="logo">
          <router-link to="/">
            <img src="/images/tesodev.png" alt="tesodev" />
          </router-link>
          <p>Search app</p>
        </div>
      </div>
      <Search />
      <ImageSlider />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.home-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .home-page {
    flex: 1;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    .header {
      display: flex;
      align-items: center;
      padding-top: 64px;
      div {
        margin-left: auto;
      }
    }
    .content {
      margin-top: 72px;
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        img {
          width: 278px;
          height: 115px;
        }
        p {
          align-self: flex-end;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
