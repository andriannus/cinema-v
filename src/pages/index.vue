<script setup lang="ts">
useHead({
  title: 'Home',
});
</script>

<template>
  <AppHeader />

  <main class="Main">
    <div class="Main-layout">
      <p>Hello World</p>
    </div>
  </main>
</template>

<style scoped>
.Main {
  @apply flex justify-center;
  min-height: calc(100vh - 66px - 160px);
}

.Main-layout {
  @apply flex;

  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}
</style>
