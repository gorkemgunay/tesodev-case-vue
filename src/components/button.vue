<script setup></script>

<template>
  <button class="button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: 700;
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  height: 46px;
  outline: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: var(--color-secondary);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
