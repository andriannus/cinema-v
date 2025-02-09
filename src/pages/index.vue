<script setup lang="ts">
import { watch } from "vue";

import { useState } from "#app";
import { useGenreStore, useHead, useMyFetch } from "#imports";

import type { DiscoverResponse } from "~/types/discover";
import type { MovieForList } from "~/types/movie";

useHead({ title: "Home" });

const genreStore = useGenreStore();

const movies = useState<MovieForList[]>("movies", () => []);
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

      <div class="flex justify-center pt-16 pb-16">
        <AppButton @click="page++">
          Load More
        </AppButton>
      </div>
    </div>
  </main>
</template>

<style scoped>
.Main {
  @apply flex justify-center;
  min-height: calc(100vh - 66px - 160px);
  padding-top: 66px;
}

.Main-layout {
  @apply flex flex-col;

  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}
</style>
