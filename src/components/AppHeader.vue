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
    class="Navbar fixed flex h-full items-center justify-center w-full"
    :class="{
      'Navbar--transparent': transparent,
      'Navbar--active ease-in': scrolled,
    }"
  >
    <div class="Navbar-layout flex justify-between w-full">
      <NuxtLink
        class="Navbar-brand cursor-pointer inline-flex"
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

      <ul class="flex">
        <li class="Nav-link flex cursor-pointer items-center uppercase">
          <nuxt-icon
            name="grid"
            class="flex h-5 mr-2.5 w-5"
          />

          <span>Categories</span>
        </li>

        <li class="Nav-link flex cursor-pointer items-center uppercase">
          Movies
        </li>

        <li class="Nav-link flex cursor-pointer items-center uppercase">
          TV Shows
        </li>

        <li class="Nav-link flex cursor-pointer items-center uppercase">
          Login
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.Navbar {
  background-color: rgba(255, 255, 255, 0.05);
  height: 66px;
  top: 0;
  z-index: 10;
}

.Navbar--transparent {
  @apply duration-300 transition-all;
  background-color: rgba(255, 255, 255, 0.05);
}

.Navbar--active {
  background-color: #000000;
}

.Navbar-layout {
  max-width: 1280px;
}

.Navbar-brand {
  max-width: calc(112px + 32px);
  padding: 8px 16px;
}

.Nav-link {
  color: #e5e5e5;
  font-weight: 500;
  padding: 8px 16px;
}

.Nav-icon :deep(svg) {
  @apply h-full w-full;
}
</style>
