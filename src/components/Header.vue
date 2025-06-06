<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  search: String,
});

const emit = defineEmits(["update:search"]);

const searchQuery = ref(props.search || "");

watch(
  () => props.search,
  (newVal) => {
    searchQuery.value = newVal || "";
  }
);

const emitSearch = () => {
  emit("update:search", searchQuery.value);
};

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);
const isCartVisible = computed(() => store.getters.isCartVisible);
const isFavoritesVisible = computed(() => store.getters.isFavoritesVisible);

const toggleCart = () => {
  if (!isCartVisible.value) {
    store.commit("SHOW_CART");
    store.commit("HIDE_FAVORITES");
  } else {
    store.commit("HIDE_CART");
  }
};

const toggleFavorites = () => {
  if (!isFavoritesVisible.value) {
    store.commit("SHOW_FAVORITES");
    store.commit("HIDE_CART");
  } else {
    store.commit("HIDE_FAVORITES");
  }
};
</script>

<style scoped>
.custom-width {
  width: calc(100% - 10px);
}
.custon-search {
  width: 500px;
}

@media (max-width: 767px) {
  .icons-header {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .logo {
    height: 60px !important;
    justify-content: flex-start;
  }
}
</style>

<template>
  <v-app-bar color="#d1efec" elevation="2">
    <div
      class="d-flex flex-wrap justify-space-between align-center w-100 pl-4 pr-4"
    >
      <v-btn
        variant="text"
        to="/"
        class="text-h6 text-white font-weight-bold text-center w-100 w-sm-auto logo"
      >
        Logo
      </v-btn>

      <div class="custon-search">
        <v-text-field
          v-model="searchQuery"
          placeholder="Pesquisa"
          density="compact"
          hide-details
          variant="outlined"
          @input="emitSearch"
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>

      <div class="icons-header">
        <v-btn icon @click="toggleFavorites" class="mx-2">
          <v-icon color="white">mdi-heart</v-icon>
        </v-btn>

        <v-btn icon @click="toggleCart" class="mx-2">
          <span
            class="position-absolute"
            style="
              top: -4px;
              right: -4px;
              height: 20px;
              width: 20px;
              background-color: #fdf3d3;
              color: #4b5563;
              font-weight: 500;
              font-size: 0.875rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            {{ cartItems.length }}
          </span>

          <v-icon color="white">mdi-cart</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>
