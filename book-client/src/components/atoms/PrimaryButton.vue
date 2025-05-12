<script setup lang="ts" >
const props = defineProps<{
	buttonLabel: string;
	type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
  <button :type="type">
    {{ buttonLabel }}
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 10rem;
  background-color: $delft-blue-color;
  color: $eggshell-color;
  font-family: $primary-font;
  font-size: 1.2rem;
  border: solid 1px $jet-color;
  border-radius: 8px;
  padding-block: 0.5rem;
  filter: drop-shadow(-3px 3px 3px rgba(0, 0, 0, 0.25));
  cursor: pointer;
}

:hover {
  color: $brown-sugar-color
}

:active {
  color: $brown-sugar-color;
  border: solid 2px $brown-sugar-color;
}

</style>
