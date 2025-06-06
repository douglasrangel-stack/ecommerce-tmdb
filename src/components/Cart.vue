<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CartItem from "./CartItem.vue";
import { usePriceFormatter } from "../composables/usePriceFormatter";

const store = useStore();
const router = useRouter();
const { formattedPrice } = usePriceFormatter();

const cartItems = computed(() => store.getters.cartItems);
const totalPrice = computed(() => store.getters.totalPrice);

function removeFromCart(title: string) {
  store.commit("REMOVE_FROM_CART", title);
}

function clearCart() {
  store.commit("CLEAR_CART");
}
const closeCart = () => {
  store.commit("HIDE_CART");
};

function goToCheckout() {
  if (cartItems.value.length === 0) {
    alert("O carrinho não pode estar vazio!");
    return;
  }
  store.commit("HIDE_CART");
  router.push("/checkout");
}
</script>

<template>
  <v-sheet
    v-motion
    :initial="{ x: '100%', opacity: 0 }"
    :enter="{ x: '0', opacity: 1 }"
    :leave="{ x: '100%', opacity: 0 }"
    transition="ease-in-out"
    class="position-fixed bottom-0 right-0 overflow-x-hidden"
    :style="{ height: '100%', width: '75%', maxWidth: '420px', zIndex: '9999' }"
    elevation="8"
    color="white"
  >
    <v-container class="pa-4">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="closeCart"
            variant="text"
            size="small"
            class="position-absolute top-0 left-0 mt-2 mr-2 text-primary text-decoration-underline"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h2 class="text-h6 font-weight-medium mb-2">Meu Carrinho</h2>

          <v-btn
            v-if="cartItems.length > 0"
            @click="clearCart"
            variant="text"
            size="small"
            class="position-absolute top-0 right-0 mt-2 mr-2 text-primary text-decoration-underline"
          >
            Esvaziar
          </v-btn>

          <p v-else>O carrinho está vazio.</p>

          <v-container
            v-if="cartItems.length > 0"
            class="pa-0 d-flex flex-column gap-2"
          >
            <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              :formattedPrice="formattedPrice"
              @remove="removeFromCart"
            />
          </v-container>
        </v-col>
      </v-row>

      <v-row class="position-absolute bottom-0 left-0 w-100 pl-4 pb-2">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <span>Total:</span>
            <span class="text-subtitle-1 font-weight-bold">
              {{ formattedPrice(totalPrice) }}
            </span>
          </div>

          <v-btn block class="mt-4" color="#6558f5" dark @click="goToCheckout">
            Finalizar compra
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
