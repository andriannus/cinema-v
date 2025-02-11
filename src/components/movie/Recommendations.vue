<script setup lang="ts">
import { computed, useMyFetch } from "#imports";

import type { MovieRecommendationResponse } from "~/types/movie";

type MovieRecommendationsProps = {
  movieId: number;
};

const { movieId } = defineProps<MovieRecommendationsProps>();

const fetchMovieRecommendations = await useMyFetch<MovieRecommendationResponse>(
  `/movie/${movieId}/recommendations`,
  {
    lazy: true,
    server: false,
  },
);

const pending = computed(
  () => fetchMovieRecommendations.status.value === "pending",
);

const movies = computed(() => {
  if (pending.value || !fetchMovieRecommendations.data.value) return [];

  const tempMovies = fetchMovieRecommendations.data.value.results;

  if (fetchMovieRecommendations.data.value.results.length <= 5) {
    return tempMovies;
  }

  return tempMovies.splice(0, 5);
});
</script>

<template>
  <template v-if="movies.length < 1" />
  <LoaderMovie v-else-if="pending" />

  <div
    v-else
    class="flex justify-center"
  >
    <div class="Recommendation-layout flex flex-col mt-13 mb-13 w-full">
      <span class="block font-semibold mb-9 text-sm text-white uppercase">
        Recommendation Movies
      </span>

      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <LazyAppMovie
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Recommendation-layout {
  max-width: 1280px;
  padding: 0 16px;
}
</style>
