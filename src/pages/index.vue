<script setup lang="ts">
import { nextTick } from 'vue';
import type { DiscoverResponse, DiscoverResult } from '~/types/discover';

useHead({ title: 'Home' });

const movies = useState<DiscoverResult[]>('movies', () => []);
const page = useState<number>('page', () => 1);

const fetchDiscover = await useMyFetch<DiscoverResponse>('/discover/movie', {
  query: { page },
  lazy: true,
  server: false,
  watch: [page],
});

watch(fetchDiscover.data, (newData, oldData) => {
  if (!newData) return;

  if (newData.page > (oldData?.page || 0)) {
    movies.value.push(...newData.results);
  }
});

onMounted(() => {
  nextTick(fetchDiscover.execute);
});
</script>

<template>
  <AppHeader />

  <main class="Main">
    <div class="Main-layout">
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="movie in movies"
          :key="movie.id"
        >
          <p class="text-white">
            {{ movie.title }}
          </p>
        </div>
      </div>

      <button @click="page++">
        Load More
      </button>
    </div>
  </main>
</template>

<style scoped>
.Main {
  @apply flex justify-center;
  min-height: calc(100vh - 66px - 160px);
}

.Main-layout {
  @apply flex;

  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}
</style>
