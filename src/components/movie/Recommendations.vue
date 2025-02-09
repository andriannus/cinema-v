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
  <template v-if="pending || movies.length < 1" />

  <div
    v-else
    class="Recommendation"
  >
    <div class="Recommendation-layout mt-13 mb-13">
      <span class="block font-semibold mb-9 text-sm text-white uppercase">
        Recommendation Movies
      </span>

      <div class="grid grid-cols-5 gap-4">
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
.Recommendation {
  @apply flex justify-center;
}

.Recommendation-layout {
  @apply flex flex-col;

  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}
</style>
