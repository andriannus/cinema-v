<script setup lang="ts">
import { useHead } from "#imports";

useHead({
  titleTemplate: "%s - MoovieTime",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
