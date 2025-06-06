<template>
  <div class="d-flex flex-wrap items-start justify-center gap-20 space-page">
    <Card
      v-for="movie in movies"
      :key="movie.id"
      :title="movie.title"
      :genre="movie.genre_names"
      :image="movie.poster_path"
      :releaseDate="movie.release_date"
      :rating="movie.vote_average"
      :price="movie.price"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.gap-20 {
  gap: 20px;
}
.space-page {
  padding: 60px 0;
}
</style>
