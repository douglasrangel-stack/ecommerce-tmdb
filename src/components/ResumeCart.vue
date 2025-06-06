<script setup lang="ts">
import CartItem from "../components/CartItem.vue";

defineProps<{
  cartItems: any[];
  totalPrice: number;
  formattedPrice: (price: number) => string;
  handleSubmit: () => void;
  removeFromCart: (title: string) => void;
}>();
</script>

<style scoped>
.border-b {
  border-bottom: 2px solid #e0e0e0;
}
</style>

<template>
  <v-container
    fluid
    class="d-flex flex-column pa-4"
    style="padding-bottom: 14rem"
    max-width="450"
  >
    <h3 class="text-h5 font-weight-medium mb-4">Resumo</h3>
    <div v-if="cartItems.length > 0" class="d-flex flex-column ga-2">
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        :formattedPrice="formattedPrice"
        @remove="removeFromCart"
        size="large"
        class="border-b"
      />
    </div>

    <!-- Rodapé com total e botão -->
    <div class="bottom-0 start-0 w-100 px-4 mb-6 pt-5">
      <div class="d-flex justify-space-between align-center mb-6">
        <span class="text-subtitle-1 font-weight-medium">Total:</span>
        <span class="text-h5 font-weight-bold">{{
          formattedPrice(totalPrice)
        }}</span>
      </div>
      <v-btn
        block
        color="primary"
        class="text-white"
        @click.prevent="handleSubmit"
      >
        Finalizar
      </v-btn>
    </div>
  </v-container>
</template>
