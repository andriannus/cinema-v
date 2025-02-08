<script setup lang="ts">
import { nextTick, onMounted, watch } from "vue";

import { useHead, useState } from "#app";
import { useGenreStore, useMyFetch } from "#imports";

import type { DiscoverResponse } from "~/types/discover";
import type { MovieGeneral } from "~/types/movie";

useHead({ title: "Home" });

const genreStore = useGenreStore();

const movies = useState<MovieGeneral[]>("movies", () => []);
const page = useState<number>("page", () => 1);

genreStore.fetchMovieGenres();

const fetchDiscover = await useMyFetch<DiscoverResponse>("/discover/movie", {
  query: { page },
  lazy: true,
  server: false,
  watch: [page],
});

watch(fetchDiscover.data, (newData, oldData) => {
  if (!newData) return;

  if (newData.page > (oldData?.page || 0)) {
    movies.value.push(...newData.results);
  }
});

onMounted(() => {
  nextTick(fetchDiscover.execute);
});
</script>

<template>
  <AppHeader />

  <main class="Main">
    <div class="Main-layout">
      <div class="grid grid-cols-4 gap-4">
        <AppMovie
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <button @click="page++">
        Load More
      </button>
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
