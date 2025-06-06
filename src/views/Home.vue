<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from "vue";

import List from "../components/List.vue";
import {
  fetchPopularMovies,
  fetchGenresApi,
  searchMovies,
} from "../services/api";
import { getRandomPrice } from "../utils";
import type { Movie } from "../types/movie";

const movies = ref<Movie[]>([]);
const genres = ref({});

const searchQuery = inject<Ref<string>>("searchQuery");

if (!searchQuery) {
  throw new Error("searchQuery not provided");
}

watch(
  searchQuery,
  (newVal: string) => {
    handleSearch(newVal);
  },
  { immediate: true }
);

function mapMoviesWithGenres(moviesList: Movie[]) {
  return moviesList.map((movie) => ({
    id: movie.id,
    title: movie.title,
    genre_names: genres.value[movie.genre_ids[0]],
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    price: getRandomPrice(),
  }));
}

const fetchGenres = async () => {
  try {
    const response = await fetchGenresApi();
    genres.value = Array.isArray(response)
      ? response.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {})
      : {};
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
  }
};

async function fetchMovies() {
  try {
    const moviesList = await fetchPopularMovies();
    movies.value = mapMoviesWithGenres(moviesList);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}

async function handleSearch(query: string) {
  if (query) {
    try {
      const moviesList: Movie[] = await searchMovies(query);
      movies.value = mapMoviesWithGenres(moviesList);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  } else {
    await fetchMovies();
  }
}

onMounted(async () => {
  document.title = "Home";
  await fetchGenres();
  await fetchMovies();
});
</script>

<template>
  <v-app>
    <main class="container mx-auto py-8 pt-40 sm:px-4 sm:pt-32">
      <List :movies="movies" />
    </main>
  </v-app>
</template>

<style scoped></style>
