import { defineStore } from "pinia";

import { printString, ref, useOFetch } from "#imports";

import type { GenreMovie, GenreMovieResponse } from "~/types/genre";

export const useGenreStore = defineStore("genreStore", () => {
  const movieGenres = ref<GenreMovie[]>([]);
  const { ofetch } = useOFetch();

  const fetchMovieGenres = async () => {
    const response = await ofetch<GenreMovieResponse>("/genre/movie/list");

    movieGenres.value = response?.genres || [];
  };

  const getMovieGenre = (id: number) => {
    const genre = movieGenres.value.find((genre) => genre.id === id);

    return printString(genre?.name);
  };

  return { fetchMovieGenres, getMovieGenre, movieGenres };
});
