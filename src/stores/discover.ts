import { defineStore } from "pinia";
import { computed } from "vue";

import { useState } from "#app";
import { useOFetch } from "#imports";

import type { DiscoverResponse } from "~/types/discover";
import type { MovieForList } from "~/types/movie";

export const useDiscoverStore = defineStore("discoverStore", () => {
  const { ofetch } = useOFetch();

  const data = useState<DiscoverResponse>("data", () => {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  });

  const movies = useState<MovieForList[]>("movies", () => []);
  const page = useState<number>("page", () => 1);
  const genres = useState<string[]>("genres", () => []);
  const sortBy = useState("sortBy", () => "");
  const loading = useState("loading", () => false);

  const withGenres = computed(() => genres.value.join(","));

  const fetchDiscover = async () => {
    return await ofetch<DiscoverResponse>("/discover/movie", {
      query: {
        page: page.value,
        ...(withGenres.value ? { with_genres: withGenres.value } : {}),
        ...(sortBy.value ? { sort_by: sortBy.value } : {}),
      },
    });
  };

  const initialize = async () => {
    loading.value = true;

    try {
      const response = await fetchDiscover();

      data.value = response;
      movies.value = response.results;
    } catch {
      //
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    loading.value = true;

    try {
      page.value += 1;

      const response = await fetchDiscover();

      data.value = response;
      movies.value.push(...response.results);
    } catch {
      //
    } finally {
      loading.value = false;
    }
  };

  const filterByGenres = async (value: string[]) => {
    loading.value = true;

    try {
      genres.value = value;
      page.value = 1;

      const response = await fetchDiscover();

      data.value = response;
      movies.value = response.results;
    } catch {
      //
    } finally {
      loading.value = false;
    }
  };

  const sortResultsBy = async (value: string) => {
    loading.value = true;

    try {
      sortBy.value = value;
      page.value = 1;

      const response = await fetchDiscover();

      data.value = response;
      movies.value = response.results;
    } catch {
      //
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    fetchDiscover,
    genres,
    initialize,
    loadMore,
    movies,
    page,
    filterByGenres,
    sortBy,
    sortResultsBy,
  };
});
