import type { Module } from "vuex/types/index.js";
import type { Product } from "../../types/movie";

interface CartState {
  cart: Product[];
  isCartVisible: boolean;
}

const getCartFromStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  return [];
};

const cart: Module<CartState, unknown> = {
  state: {
    cart: getCartFromStorage(),
    isCartVisible: false,
  },
  mutations: {
    ADD_TO_CART(state: CartState, product: Product) {
      state.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state: CartState, title: string) {
      state.cart = state.cart.filter((item) => item.title !== title);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    CLEAR_CART(state: CartState) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    TOGGLE_CART(state: CartState) {
      state.isCartVisible = !state.isCartVisible;
    },
    SHOW_CART(state: CartState) {
      state.isCartVisible = true;
    },
    HIDE_CART(state: CartState) {
      state.isCartVisible = false;
    },
  },
  getters: {
    cartItems: (state: CartState) => state.cart,
    totalPrice: (state: CartState) =>
      state.cart.reduce((acc, item) => acc + item.price, 0),
    isInCart: (state: CartState) => (title: string) =>
      state.cart.some((item) => item.title === title),
    isCartVisible: (state: CartState) => state.isCartVisible,
  },
};

export default cart;
