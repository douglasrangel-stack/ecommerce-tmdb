<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["update:isOpen"]);

const store = useStore();
const router = useRouter();

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit("update:isOpen", val),
});

const clearCart = () => store.commit("CLEAR_CART");

const handleGoToStore = () => {
  clearCart();
  isOpen.value = false;
  router.push("/");
};
</script>

<template>
  <v-dialog v-model="isOpen" persistent max-width="400">
    <v-card class="pa-6">
      <v-card-title class="text-h6 text-center font-weight-bold"
        >Obrigado Douglas Rangel</v-card-title
      >
      <v-card-text class="text-center">
        Sua compra foi finalizada com sucesso.
      </v-card-text>
      <v-card-actions class="justify-center mt-4">
        <v-btn
          color="primary"
          class="text-white"
          block
          @click="handleGoToStore"
        >
          Ir para a loja
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
