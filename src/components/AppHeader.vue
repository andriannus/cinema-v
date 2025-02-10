<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useState } from "#app";

type AppHeaderProps = {
  transparent?: boolean;
};

const { transparent } = defineProps<AppHeaderProps>();

const scrolled = useState<boolean>("scrolled", () => false);

const changeNavbarBackground = () => {
  const scrollY = window.scrollY;

  if (scrollY > 0) {
    scrolled.value = true;
  } else {
    scrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", changeNavbarBackground);
});

onUnmounted(() => {
  window.removeEventListener("scroll", changeNavbarBackground);
});
</script>

<template>
  <nav
    class="Navbar"
    :class="{
      'Navbar--transparent': transparent,
      'Navbar--active ease-in': scrolled,
    }"
  >
    <div class="Navbar-layout">
      <NuxtLink
        class="Navbar-brand"
        to="/"
      >
        <picture>
          <source
            srcset="~/assets/images/logo.png"
            type="image/png"
          >

          <source
            srcset="~/assets/images/logo.webp"
            type="image/webp"
          >

          <img
            src="~/assets/images/logo.png"
            alt="Logo"
          >
        </picture>
      </NuxtLink>

      <AppSearch />

      <ul class="Navbar-nav">
        <li class="Nav-link">
          <nuxt-icon
            name="grid"
            class="Nav-icon"
          />

          <span>Categories</span>
        </li>

        <li class="Nav-link">
          Movies
        </li>

        <li class="Nav-link">
          TV Shows
        </li>

        <li class="Nav-link">
          Login
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.Navbar {
  @apply flex w-full h-full items-center justify-center fixed;

  background-color: rgba(255, 255, 255, 0.05);
  height: 66px;
  top: 0;
  z-index: 10;
}

.Navbar--transparent {
  background-color: rgba(255, 255, 255, 0.05);
}

.Navbar--active {
  @apply transition-all duration-300;

  background-color: #000000;
}

.Navbar-layout {
  @apply flex justify-between w-full;

  max-width: 1280px;
}

.Navbar-nav {
  @apply flex;
}

.Navbar-brand {
  @apply cursor-pointer inline-flex;

  max-width: calc(112px + 32px);
  padding: 8px 16px;
}

.Nav-link {
  @apply flex cursor-pointer items-center uppercase;

  color: #e5e5e5;
  font-weight: 500;
  padding: 8px 16px;
}

.Nav-icon {
  @apply flex h-full w-full;

  height: 20px;
  margin-right: 10px;
  width: 20px;
}

.Nav-icon :deep(svg) {
  @apply h-full w-full;
}
</style>
