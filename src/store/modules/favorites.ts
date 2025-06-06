import type { Module } from "vuex/types/index.js";
import type { Product } from "../../types/movie";

interface FavoritesState {
  favorites: Product[];
  isFavoritesVisible: boolean;
}

const getFavoritesFromStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }
  return [];
};

const favorites: Module<FavoritesState, unknown> = {
  state: {
    favorites: getFavoritesFromStorage(),
    isFavoritesVisible: false,
  },
  mutations: {
    ADD_TO_FAVORITES(state: FavoritesState, product: Product) {
      state.favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    REMOVE_FROM_FAVORITES(state: FavoritesState, title: string) {
      state.favorites = state.favorites.filter((item) => item.title !== title);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    CLEAR_FAVORITES(state: FavoritesState) {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
    TOGGLE_FAVORITES(state: FavoritesState) {
      state.isFavoritesVisible = !state.isFavoritesVisible;
    },
    SHOW_FAVORITES(state: FavoritesState) {
      state.isFavoritesVisible = true;
    },
    HIDE_FAVORITES(state: FavoritesState) {
      state.isFavoritesVisible = false;
    },
  },
  getters: {
    favoriteItems: (state: FavoritesState) => state.favorites,
    isInFavorites: (state: FavoritesState) => (title: string) =>
      state.favorites.some((item) => item.title === title),
    isFavoritesVisible: (state: FavoritesState) => state.isFavoritesVisible,
  },
};

export default favorites;
