<script setup lang="ts">
type AppButtonProps = {
  outline?: boolean;
};

const { outline } = defineProps<AppButtonProps>();
</script>

<template>
  <button
    class="Button cursor-pointer border-red-500 bg-red-500 hover:bg-red-700 rounded-full text-white"
    :class="{
      'Button--outline': outline,
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.Button {
  padding: 8px 36px;
}

.Button--outline {
  background-color: transparent;
  border: 1px solid #ffffff;
}

.Button--outline:hover {
  background-color: #ffffff;
  color: #000000;
}
</style>
