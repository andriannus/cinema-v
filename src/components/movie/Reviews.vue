<script setup lang="ts">
import {
  computed,
  transformToReviewDate,
  useMyFetch,
  useState,
  watch,
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

const shouldFullContents = useState<boolean[]>("shouldFullContents", () => []);

watch(reviews.value, () => {
  shouldFullContents.value = new Array(reviews.value.length).fill(true);
});

const readMoreContent = (index: number) => {
  shouldFullContents.value[index] = !shouldFullContents.value[index];
};

const transformContent = (index: number, content: string) => {
  if (shouldFullContents.value[index]) {
    return content;
  }

  return `${content.substring(0, 300)}...`;
};
</script>

<template>
  <template v-if="pending || reviews.length < 1" />

  <div
    v-else
    class="bg-white flex justify-center"
  >
    <div class="Review-layout flex flex-col">
      <span class="block font-semibold mb-6 text-sm text-red-500">
        REVIEWS
      </span>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(review, index) in reviews"
          :key="review.id"
          class="Review-card h-fit p-6 rounded-lg"
        >
          <div class="flex mb-6">
            <div
              class="w-12 h-12 bg-gray-300 mr-4 overflow-hidden rounded-full"
            >
              <img
                v-if="!!review.author_details.avatar_path"
                :src="`${TMDB_IMAGE_BASE_URL}/original${review.author_details.avatar_path}`"
                :alt="review.author_details.name"
              >
            </div>

            <div class="flex flex-col grow">
              <span>{{ review.author_details.username }}</span>
              <span>{{ transformToReviewDate(review.created_at) }}</span>
            </div>

            <div
              v-if="review.author_details.rating !== null"
              class="Review-rating flex font-semibold items-start rounded-lg text-2xl"
            >
              <nuxt-icon
                class="Review-icon flex h-4 w-4"
                name="star"
              />

              <span class="font-semibold text-4xl ml-1.5">
                {{ review.author_details.rating.toFixed(1) }}
              </span>
            </div>
          </div>

          <p>
            {{ transformContent(index, review.content) }}

            <button
              class="text-red-500 italic underline cursor-pointer"
              @click="readMoreContent(index)"
            >
              {{
                shouldFullContents[index] ? "read the less." : "read the more."
              }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Review-layout {
  max-width: 1280px;
  padding: 56px 16px;
  width: 100%;
}

.Review-card {
  background-color: #f9f9f9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}

.Review-rating {
  background-color: rgba(196, 196, 196, 0.28);
  padding: 4px 16px 4px 6px;
}

.nuxt-icon :deep(svg) {
  color: #ffb802;
  height: 100%;
  margin-bottom: 0;
  width: 100%;
}
</style>
