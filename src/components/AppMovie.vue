<script setup lang="ts">
import { navigateTo, toFixedIfNecessary, useGenreStore } from "#imports";

import { TMDB_IMAGE_BASE_URL } from "~/constants/movie";
import type { MovieForList } from "~/types/movie";

type AppMovieProps = {
  movie: MovieForList;
};

const { movie } = defineProps<AppMovieProps>();
const { getMovieGenre } = useGenreStore();
</script>

<template>
  <div class="Movie">
    <div class="Movie-poster group/movie">
      <img
        v-if="!!movie.poster_path"
        :src="`${TMDB_IMAGE_BASE_URL}/w300${movie.poster_path}`"
        :alt="movie.title"
        loading="lazy"
      >

      <span class="Movie-rating font-bold top-0 right-0">
        {{ toFixedIfNecessary(movie.vote_average) }}
      </span>

      <div
        class="Movie-hover absolute invisible top-0 left-0 group-hover/movie:visible transition-all ease-in duration-300 opacity-0 hover:opacity-100"
      >
        <div class="flex font-semibold items-center text-2xl">
          <nuxt-icon
            class="Movie-icon"
            name="star"
          />

          <span class="ml-2">{{ toFixedIfNecessary(movie.vote_average) }}</span>
        </div>

        <span class="text-lg font-semibold">
          {{ getMovieGenre(movie.genre_ids[0]) }}
        </span>

        <div class="grid gap-4">
          <AppButton @click="navigateTo(`/movie/${movie.id}`)">
            <span class="font-bold uppercase">View</span>
          </AppButton>

          <AppButton outline>
            <span class="font-bold uppercase">Add</span>
          </AppButton>
        </div>
      </div>
    </div>

    <span class="Movie-title">{{ movie.title }}</span>

    <span class="Movie-subtitle">
      {{ new Date(movie.release_date).getFullYear() }}
    </span>
  </div>
</template>

<style scoped>
.Movie {
  color: #ffffff;
  width: 100%;
  max-width: 220px;
}

.Movie-title {
  color: #e5e5e5;
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Movie-subtitle {
  color: #929292;
  display: block;
  font-size: 14px;
}

.Movie-rating {
  @apply absolute;

  background-color: rgba(30, 35, 43, 0.8);
  color: #e5e5e5;
  padding: 6px 12px;
}

.Movie-poster {
  @apply relative;

  background-color: #ffffff;
  margin-bottom: 12px;
  min-width: 220px;
  min-height: 330px;
}

.Movie-hover {
  @apply flex flex-col items-center justify-evenly;

  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}

.Movie-icon {
  @apply flex h-full w-full;

  height: 32px;
  width: 32px;
}

.Movie-icon :deep(svg) {
  @apply h-full w-full;

  color: #ffb802;
  margin-bottom: 0;
}
</style>
