<script setup lang="ts">
interface IProps {
  id?: string;
  modelValue: string;
  label?: string;
  error?: string | null;
  iconLeft?: Object | null;
}

const props = withDefaults(defineProps<IProps>(), {
  id: "",
  modelValue: "",
  label: "",
  error: null,
  iconLeft: null,
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div :class="['input-wrapper', error && 'input-wrapper-error']">
    <label v-if="label" :for="props.id" class="label">{{ label }}</label>
    <div>
      <component :is="props.iconLeft" class="icon" />
      <input
        :id="props.id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
        :class="['input', props.iconLeft && 'input-with-icon']"
        v-bind="$attrs"
      />
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  .label {
    color: var(--color-input-label);
    font-size: 18px;
    font-weight: 700;
  }
  div {
    display: flex;
    position: relative;
    width: 100%;
    .input {
      border: 1px solid var(--color-border);
      font-size: 18px;
      font-weight: 700;
      background-color: var(--color-white);
      border-radius: 8px;
      width: 100%;
      height: 46px;
      padding-left: 16px;
      padding-right: 16px;
      outline: 0;
      &.input-with-icon {
        padding-left: 48px;
      }
      &:hover {
        background-color: var(--color-input-background-hover);
      }
      &::placeholder {
        color: var(--color-input-placeholder);
      }
    }
    .icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
  &.input-wrapper-error {
    .label {
      color: var(--color-input-label-error);
    }
    .input {
      border: 1px solid var(--color-input-border-error);
      &::placeholder {
        color: var(0-color-input-placeholder-error);
      }
    }
    .error {
      color: var(--color-input-placeholder-error);
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
