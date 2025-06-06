<script setup lang="ts">
import { computed, provide, ref } from "vue";
import Header from "./components/Header.vue";
import Cart from "./components/Cart.vue";
import Favorites from "./components/Favorites.vue";
import {
  fetchPopularMovies,
  fetchGenresApi,
  searchMovies,
} from "./services/api";
import { getRandomPrice } from "./utils";
import type { Movie } from "./types/movie";
import { useStore } from "vuex";

const searchQuery = ref("");
const movies = ref<Movie[]>([]);
const genres = ref({});

provide("searchQuery", searchQuery);

const store = useStore();

const isCartVisible = computed(() => store.getters.isCartVisible);
const isFavoritesVisible = computed(() => store.getters.isFavoritesVisible);

function mapMoviesWithGenres(moviesList: Movie[]) {
  return moviesList.map((movie) => ({
    id: movie.id,
    title: movie.title,
    genre_names: (genres.value as Record<number, string>)[movie.genre_ids![0]],
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
    await fetchGenres();
    const moviesList = await fetchPopularMovies();
    movies.value = mapMoviesWithGenres(moviesList);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}

async function handleSearch(query: string) {
  searchQuery.value = query;
  if (query) {
    try {
      const moviesList = await searchMovies(query);
      movies.value = mapMoviesWithGenres(moviesList);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  } else {
    await fetchMovies();
  }
}
</script>

<template>
  <v-app>
    <Header :search="searchQuery" @update:search="handleSearch"></Header>
    <router-view />
    <Cart v-if="isCartVisible" />
    <Favorites v-if="isFavoritesVisible" />
  </v-app>
</template>

<style scoped></style>
