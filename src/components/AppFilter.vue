<script setup lang="ts">
import { computed, useDiscoverStore, useGenreStore } from "#imports";

import { SORT_OPTIONS } from "~/constants/discover";

const genreStore = useGenreStore();
const discoverStore = useDiscoverStore();

const genreOptions = computed(() => {
  return genreStore.movieGenres.map((genre) => ({
    label: genre.name,
    value: genre.id.toString(),
  }));
});
</script>

<template>
  <div class="Filter block">
    <div>
      <div class="Filter-title Filter-titleSort pb-4 pt-0.5">
        Sort Result By
      </div>

      <div class="p-5">
        <AppSelect
          :options="SORT_OPTIONS"
          @change="discoverStore.sortResultsBy"
        />
      </div>
    </div>

    <div v-if="genreOptions.length">
      <div class="Filter-title Filter-titleGenre">
        Genres
      </div>

      <div class="mt-4 pl-5 pr-5 pb-5">
        <LazyAppCheckboxGroup
          :options="genreOptions"
          @change="discoverStore.filterByGenres"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Filter {
  background: linear-gradient(180deg, #0e1723 0%, rgba(30, 35, 42, 0) 100%);
  border-radius: 8px;
  color: #ffffff;
}

.Filter-title {
  font-size: 16px;
  font-weight: 600;
}

.Filter-titleSort {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 20px;
}

.Filter-titleGenre {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px 20px;
}
</style>
