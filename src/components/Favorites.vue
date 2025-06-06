<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import CartItem from "./CartItem.vue";
import { usePriceFormatter } from "../composables/usePriceFormatter";

const store = useStore();
const { formattedPrice } = usePriceFormatter();
const favoriteItems = computed(() => store.getters.favoriteItems);

function removeFromFavorites(title: string) {
  store.commit("REMOVE_FROM_FAVORITES", title);
}

function clearFavorites() {
  store.commit("CLEAR_FAVORITES");
}
const closeFavorites = () => {
  store.commit("HIDE_FAVORITES");
};
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
            @click="closeFavorites"
            variant="text"
            size="small"
            class="position-absolute top-0 left-0 mt-2 mr-2 text-primary text-decoration-underline"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h2 class="text-h6 font-weight-medium mb-2">Meu Carrinho</h2>

          <v-btn
            v-if="favoriteItems.length > 0"
            @click="clearFavorites"
            variant="text"
            size="small"
            class="position-absolute top-0 right-0 mt-2 mr-2 text-primary text-decoration-underline"
          >
            Esvaziar
          </v-btn>

          <p v-else>Não há favoritos.</p>

          <v-container
            v-if="favoriteItems.length > 0"
            class="pa-0 d-flex flex-column gap-2"
          >
            <CartItem
              v-for="item in favoriteItems"
              :key="item.id"
              :item="item"
              :formattedPrice="formattedPrice"
              @remove="removeFromFavorites"
              :isFavorite="true"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
