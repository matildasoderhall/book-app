<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: string;
	placeholder: string;
	type?: 'text' | 'radio' | 'checkbox' | 'date' | 'password';
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInplutElement;
  emit('update:modelValue', target.value);
};

</script>

<template>
  <input
  :type="type"
  :placeholder="placeholder"
  :value="modelValue"
  @input="onInput"
  />
</template>

<style lang="scss" scoped>
input[type="text"],
input[type="date"],
input[type="password"] {
  font-family: $primary-font;
  width: 18rem;
  border: solid 1px $delft-blue-color;
  border-radius: 8px;
  padding-inline: 0.5rem;
  padding-block: 0.7rem;
}

input[type="radio"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: solid 2px $delft-blue-color;
  &:hover {
    border: solid 2px $brown-sugar-color;
  }
  &:checked {
    background-color: $delft-blue-color;
  }
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 2px solid $delft-blue-color;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: $brown-sugar-color;
  }

  &:checked {
    background-color: $delft-blue-color;
  }
}

</style>
