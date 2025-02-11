<script setup lang="ts">
import {
  useDiscoverStore,
  useGenreStore,
  useRequestURL,
  useSeoMeta,
} from "#imports";

const url = useRequestURL();

const genreStore = useGenreStore();
const discoverStore = useDiscoverStore();

genreStore.fetchMovieGenres();
discoverStore.initialize();

useSeoMeta({
  title: "Home",
  ogTitle: "Home",
  twitterTitle: "Home",
  description: "Find your favorite movies!",
  ogDescription: "Find your favorite movies!",
  twitterDescription: "Find your favorite movies!",
  ogUrl: url.href,
});
</script>

<template>
  <AppHeader />

  <main class="Main flex justify-center">
    <div class="Main-layout grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="Heading col-span-4 flex items-center justify-between pt-4 md:pt-24 pb-4 md:pb-12">
        <h1 class="font-semibold text-2xl">
          Discover Movies
        </h1>

        <div class="flex items-center">
          <span class="mr-3">My Movies</span>

          <div class="Chip">
            <span class="font-semibold mr-1">2</span>
            <span>movies</span>
          </div>
        </div>
      </div>

      <div class="hidden md:block">
        <AppFilter />
      </div>

      <div class="col-span-4 md:col-span-3">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="movie in discoverStore.movies"
            :key="movie.id"
            class="flex justify-center"
          >
            <AppMovie :movie="movie" />
          </div>
        </div>

        <div class="flex justify-center pt-16 pb-16">
          <AppButton @click="discoverStore.loadMore">
            Load More
          </AppButton>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.Main {
  min-height: calc(100vh - 66px - 160px);
  padding-top: 66px;
}

.Main-layout {
  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}

.Heading {
  color: #e5e5e5;
}

.Chip {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  display: inline-block;
  padding: 8px 18px;
}
</style>
