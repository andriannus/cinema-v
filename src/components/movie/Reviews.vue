<script setup lang="ts">
import {
  computed,
  transformToReviewDate,
  useMyFetch,
} from "#imports";
import { TMDB_IMAGE_BASE_URL } from "~/constants/movie";

import type { MovieReviewResponse } from "~/types/movie";

type MovieReviewsProps = {
  movieId: number;
};

const { movieId } = defineProps<MovieReviewsProps>();

const fetchMovieReviews = await useMyFetch<MovieReviewResponse>(
  `/movie/${movieId}/reviews`,
  {
    lazy: true,
    server: false,
  },
);

const pending = computed(() => fetchMovieReviews.status.value === "pending");

const reviews = computed(() => {
  if (pending.value || !fetchMovieReviews.data.value) return [];

  const tempReviews = fetchMovieReviews.data.value.results;

  if (fetchMovieReviews.data.value.results.length <= 2) {
    return tempReviews;
  }

  return tempReviews.sort(() => 0.5 - Math.random()).slice(-2);
});
</script>

<template>
  <template v-if="pending || reviews.length < 1" />

  <div
    v-else
    class="Review"
  >
    <div class="Review-layout">
      <span class="block font-semibold mb-6 text-sm text-red-500 uppercase">
        REVIEWS
      </span>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="Review-card"
        >
          <div class="flex mb-6">
            <div class="w-12 h-12 bg-gray-300 mr-4 overflow-hidden rounded-full">
              <img
                v-if="!!review.author_details.avatar_path"
                :src="`${TMDB_IMAGE_BASE_URL}/original/${review.author_details.avatar_path}`"
                :alt="review.author_details.name"
              >
            </div>

            <div class="flex flex-col grow">
              <span>{{ review.author_details.username }}</span>
              <span>{{ transformToReviewDate(review.created_at) }}</span>
            </div>

            <div
              v-if="review.author_details.rating !== null"
              class="Review-rating flex font-semibold items-start text-2xl"
            >
              <nuxt-icon
                class="Review-icon"
                name="star"
              />

              <span class="font-semibold text-4xl ml-1.5">
                {{ review.author_details.rating.toFixed(1) }}
              </span>
            </div>
          </div>

          <p>{{ review.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Review {
  @apply flex justify-center;

  background-color: #ffffff;
}

.Review-layout {
  @apply flex flex-col;

  max-width: 1280px;
  padding: 56px 16px;
  width: 100%;
}

.Review-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.Review-rating {
  background-color: rgba(196, 196, 196, 0.28);
  border-radius: 8px;
  padding: 4px 16px 4px 6px;
}

.Review-icon {
  @apply flex h-full w-full;

  height: 16px;
  width: 16px;
}

.Review-icon :deep(svg) {
  @apply h-full w-full;

  color: #ffb802;
  margin-bottom: 0;
}
</style>
