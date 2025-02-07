<template>
  <div class="Layout">
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped>
.Layout {
  @apply min-h-screen;
  background-color: #1e232b;
}
</style>
