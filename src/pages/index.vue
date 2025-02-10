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

  <main class="Main">
    <div class="Main-layout grid grid-cols-4 gap-8">
      <div class="Heading col-span-4">
        <h1 class="font-semibold text-2xl">
          Discover Movies
        </h1>

        <div>
          <span class="mr-3">My Movies</span>

          <div class="Chip">
            <span class="font-semibold">2</span> movies
          </div>
        </div>
      </div>

      <div>
        <AppFilter />
      </div>

      <div class="col-span-3">
        <div class="grid grid-cols-4 gap-4">
          <AppMovie
            v-for="movie in discoverStore.movies"
            :key="movie.id"
            :movie="movie"
          />
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
  @apply flex justify-center;
  min-height: calc(100vh - 66px - 160px);
  padding-top: 66px;
}

.Main-layout {
  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}

.Heading {
  @apply flex items-center justify-between;

  color: #e5e5e5;
  padding-top: 104px;
  padding-bottom: 52px;
}

.Chip {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  display: inline-block;
  padding: 8px 18px;
}
</style>
