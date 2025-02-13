<script setup lang="ts">
import {
  computed,
  useMyFetch,
  useRequestURL,
  useRoute,
  useSeoMeta,
  useState,
} from "#imports";

import { TMDB_IMAGE_BASE_URL } from "~/constants/movie";
import type { MovieDetail } from "~/types/movie";

const url = useRequestURL();
const route = useRoute();

const movie = useState<Partial<MovieDetail>>("movie", () => ({}));

const fetchMovie = await useMyFetch<MovieDetail>(`/movie/${route.params.id}`);

if (fetchMovie.status.value === "success" && fetchMovie.data.value) {
  movie.value = fetchMovie.data.value;
}

useSeoMeta({
  title: movie.value.title,
  ogTitle: movie.value.title,
  twitterTitle: movie.value.title,
  description: movie.value.overview,
  ogDescription: movie.value.overview,
  twitterDescription: movie.value.overview,
  ogImage: `${TMDB_IMAGE_BASE_URL}/w300${movie.value.poster_path}`,
  twitterImage: `${TMDB_IMAGE_BASE_URL}/w300${movie.value.poster_path}`,
  ogUrl: url.href,
});

const genres = computed(() => {
  return movie.value.genres?.map((genre) => genre.name).join(", ");
});
</script>

<template>
  <AppHeader transparent />

  <div
    class="Backdrop"
    :style="{
      backgroundImage: `url(${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path})`,
    }"
  />

  <div class="flex justify-center p-6">
    <div class="Detail-layout flex flex-col md:flex-row text-white">
      <div class="Detail-poster md:mr-8">
        <img
          v-if="!!movie.poster_path"
          :src="`${TMDB_IMAGE_BASE_URL}/w300${movie.poster_path}`"
          :alt="movie.title"
          loading="lazy"
          class="w-full"
        >
      </div>

      <div class="flex flex-col justify-evenly grow w-full">
        <div class="pt-4 pb-8">
          <span
            v-if="movie.release_date"
            class="font-medium text-lg"
          >
            {{ new Date(movie.release_date).getFullYear() }}
          </span>

          <h1 class="font-semibold text-4xl">
            {{ movie.title }}
          </h1>

          <span class="font-medium text-sm">{{ genres }}</span>
        </div>

        <div>
          <span class="block font-semibold mb-2 text-sm text-red-500 uppercase">
            OVERVIEW
          </span>

          <p class="text-sm">
            {{ movie.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <template v-if="movie.id">
    <LazyMovieReviews :movie-id="movie.id" />
    <LazyMovieRecommendations :movie-id="movie.id" />
  </template>
</template>

<style scoped>
.Backdrop {
  opacity: 0.2;
  background-size: cover;
  height: 810px;
}

.Detail-poster {
  background-color: #ffffff;
}

.Detail-layout {
  max-width: 1280px;
  width: 100%;
}
</style>
