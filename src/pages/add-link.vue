<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import Input from "@/components/input.vue";
import Button from "@/components/button.vue";
import Toast from "@/components/list/toast.vue";
import ArrowIcon from "@/icons/arrow-icon.vue";
import { IToast } from "@/types";
import { getRandomDate } from "@/lib/utils";

const formValues = reactive({
  nameSurname: "",
  country: "",
  city: "",
  email: "",
  website: "",
});
const toasts = ref<IToast[]>([]);

const router = useRouter();

const isNameSurnameValid = computed(() => {
  if (formValues.nameSurname) {
    return !/^[A-Za-z\s]{4,60}$/.test(formValues.nameSurname)
      ? "Name and surname should contains at least 2 words"
      : null;
  }
  return null;
});
const isCountryValid = computed(() => {
  if (formValues.country) {
    return !/^[A-Za-z\s]{2,40}$/.test(formValues.country)
      ? "Country should contains at least 2 words and maximum 40 words"
      : null;
  }
  return null;
});
const isCityValid = computed(() => {
  if (formValues.city) {
    return !/^[A-Za-z\s]{2,40}$/.test(formValues.city)
      ? "City should contains at least 2 words and maximum 40 words"
      : null;
  }
  return null;
});
const isEmailValid = computed(() => {
  if (formValues.email) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
      ? "Email should be valid"
      : null;
  }
  return null;
});
const isWebsiteValid = computed(() => {
  if (formValues.website) {
    return !/^(http|https):\/\/([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(
      formValues.website
    )
      ? "Website should be valid"
      : null;
  }
  return null;
});

const handleSubmit = async () => {
  const validationProperties = [
    isNameSurnameValid.value,
    isCountryValid.value,
    isCityValid.value,
    isEmailValid.value,
    isWebsiteValid.value,
  ];

  validationProperties.forEach((property) => {
    if (property) {
      toasts.value.push({
        id: `${new Date().getTime()}-${property}`,
        title: "Error while adding link element",
        description: property,
      });
    }
  });

  if (
    !isNameSurnameValid.value &&
    !isCountryValid.value &&
    !isCityValid.value &&
    !isEmailValid.value &&
    !isWebsiteValid.value
  ) {
    const copiedValues = JSON.parse(localStorage.getItem("data") || "");

    // you need to enable your cors for this request
    const response = await fetch(
      `https://ulvis.net/API/write/get?url=${formValues.website}=&private=1]`
    );
    const data = await response.json();

    const value = {
      id: new Date().getTime(),
      nameSurname: formValues.nameSurname,
      company: "Tesodev",
      country: formValues.country,
      city: formValues.city,
      email: formValues.email,
      website: data.data.url || formValues.website,
      phone: "123-123-1234",
      date: getRandomDate(),
    };

    localStorage.setItem("data", JSON.stringify([...copiedValues, value]));

    router.push({ name: "list" });
  }
};

const handleCloseToast = (id: string) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

const handleNavigate = () => {
  router.push({ name: "list" });
};
</script>

<template>
  <div class="add-link-page-wrapper">
    <div class="add-link-page">
      <header class="header">
        <router-link to="/">
          <img src="/images/tesodev.png" alt="tesodev" />
        </router-link>
        <div @click="handleNavigate">
          <ArrowIcon />
          <h4>Return to List Page</h4>
        </div>
      </header>
      <div class="add-link-page">
        <form class="create-data-form" @submit.prevent="handleSubmit">
          <Input
            label="Name Surname"
            placeholder="Enter name and surname"
            :modelValue="formValues.nameSurname"
            @update:model-value="
              (e) => (formValues.nameSurname = e.target.value)
            "
            :error="isNameSurnameValid"
          />
          <Input
            label="Country"
            placeholder="Enter country"
            :modelValue="formValues.country"
            @update:model-value="(e) => (formValues.country = e.target.value)"
            :error="isCountryValid"
          />
          <Input
            label="City"
            placeholder="Enter a city"
            :modelValue="formValues.city"
            @update:model-value="(e) => (formValues.city = e.target.value)"
            :error="isCityValid"
          />
          <Input
            label="Email"
            placeholder="Enter a email (abc@xyz.com)"
            :modelValue="formValues.email"
            @update:model-value="(e) => (formValues.email = e.target.value)"
            :error="isEmailValid"
          />
          <Input
            label="Website"
            placeholder="Enter a website (https://xyz.com)"
            :modelValue="formValues.website"
            @update:model-value="(e) => (formValues.website = e.target.value)"
            :error="isWebsiteValid"
          />
          <div class="right">
            <Button
              :disabled="
                !formValues.nameSurname ||
                !formValues.country ||
                !formValues.city ||
                !formValues.email ||
                !formValues.website
              "
              >Add</Button
            >
          </div>
        </form>
      </div>
      <div class="toasts" v-if="toasts.length > 0">
        <div v-for="toast in toasts" :key="toast.id">
          <Toast
            :id="toast.id"
            :title="toast.title"
            :description="toast.description"
            @close="handleCloseToast"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-link-page-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .add-link-page {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    .header {
      display: flex;
      align-items: center;
      gap: 40px;
      padding: 48px 0;
      img {
        width: 149px;
        height: 63px;
      }
      div {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        h4 {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-border);
        }
      }
    }
    .add-link-page {
      width: 590px;
      margin-left: auto;
      margin-right: auto;
      .create-data-form {
        display: flex;
        flex-direction: column;
        gap: 36px;
        .right {
          align-self: flex-end;
        }
      }
    }
  }
  .toasts {
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow-y: scroll;
    gap: 16px;
    height: 768px;
  }
}
</style>
