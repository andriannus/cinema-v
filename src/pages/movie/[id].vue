<script setup lang="ts">
import { useMyFetch, useRoute, useSeoMeta, useState } from "#imports";

import { TMDB_IMAGE_BASE_URL } from "~/constants/movie";
import type { MovieDetail, MovieForList } from "~/types/movie";

const route = useRoute();
const movie = useState<Partial<MovieForList>>("movie", () => ({}));

const fetchMovie = await useMyFetch<MovieDetail>(`/movie/${route.params.id}`);

if (fetchMovie.status.value === "success" && fetchMovie.data.value) {
  movie.value = fetchMovie.data.value;
}

useSeoMeta({
  title: movie.value.title,
  ogTitle: movie.value.title,
  description: movie.value.overview,
  ogDescription: movie.value.overview,
});
</script>

<template>
  <AppHeader transparent />

  <div
    class="Backdrop"
    :style="{
      backgroundImage: `url(${TMDB_IMAGE_BASE_URL}/original/${movie.backdrop_path})`,
    }"
  />
</template>

<style>
.Backdrop {
  opacity: 0.2;
  background-size: cover;
  height: 810px;
}
</style>
