<script setup lang="ts">
import CloseIcon from "@/icons/close-icon.vue";

interface IProps {
  id: string;
  title: string;
  description: string;
}

const emit = defineEmits(["close"]);

const props = withDefaults(defineProps<IProps>(), {
  id: "",
  title: "",
  description: "",
});

const handleClose = () => {
  emit("close", props.id);
};
</script>

<template>
  <div class="toast">
    <div class="content">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
    <p class="error-text">Error</p>
    <div class="close" @click="handleClose">
      <CloseIcon />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-radius: 8px;
  background-color: #c4c4c4;
  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 240px;
    width: 100%;
    h4 {
      font-size: 14px;
      font-weight: 700;
    }
    p {
      font-size: 13px;
    }
  }
  .error-text {
    border-radius: 48px;
    background-color: #ff4e78;
    padding: 8px 16px;
    color: var(--color-white);
    font-weight: 500;
  }
  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
}
</style>
