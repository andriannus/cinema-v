<script setup lang="ts">
type AppButtonProps = {
  outline?: boolean;
};

const { outline } = defineProps<AppButtonProps>();
</script>

<template>
  <button
    class="Button border-red-500 bg-red-500 hover:bg-red-700 text-white"
    :class="{
      'Button--outline': outline,
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.Button {
  @apply cursor-pointer rounded-full;

  padding: 8px 36px;
}

.Button--outline {
  @apply bg-transparent;

  border: 1px solid #ffffff;
}

.Button--outline:hover {
  background-color: #ffffff;
  color: #000000;
}
</style>
