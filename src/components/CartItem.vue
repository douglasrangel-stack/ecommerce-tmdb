<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ImageDefault from "../assets/icons/ImageDefault.svg";
import Trash from "../assets/icons/Trash.svg";
import Cart from "../assets/icons/Cart.svg";
import { useCart } from "../composables/useCart";

const props = defineProps<{
  item: {
    title: string;
    image?: string;
    price: number;
  };
  formattedPrice: (price: number) => string;
  size?: "small" | "large";
  isFavorite?: boolean;
}>();

const emit = defineEmits<{
  (e: "remove", title: string): void;
}>();

const size = props.size ?? "small";
const isFavorite = props.isFavorite ?? false;

const { isInCart, toggleCart } = useCart(
  props.item.title,
  props.item.image ?? "",
  props.item.price
);
</script>

<style scoped>
.item:nth-last-child(1) {
  border: 0;
}
</style>

<template>
  <v-row
    class="item"
    align="center"
    no-gutters
    :class="[
      'border-b pb-2',
      size === 'large' ? 'gap-4' : 'gap-2',
      isFavorite ? 'position-relative' : '',
    ]"
  >
    <v-col
      class="flex-shrink-0 overflow-hidden rounded pt-2"
      :class="size === 'large' ? 'h-24 w-24' : 'h-12 w-12'"
      cols="auto"
    >
      <v-img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        cover
        style="width: 50px; height: 50px; margin-right: 5px"
      />
      <v-sheet
        v-else
        class="d-flex align-center justify-center bg-grey-lighten-2"
        height="100%"
        width="100%"
      >
        <ImageDefault
          :class="size === 'large' ? 'w-10 h-10' : 'w-5 h-5'"
          class="text-grey-darken-1"
        />
      </v-sheet>
    </v-col>

    <v-col class="d-flex align-center justify-space-between">
      <h3
        class="text-truncate pr-2"
        :class="size === 'large' ? 'text-body-1' : 'text-body-2'"
        style="max-width: 180px"
      >
        {{ item.title }}
      </h3>

      <span v-if="!isFavorite" class="text-center px-3">1</span>

      <div class="d-flex align-center justify-end" style="gap: 8px">
        <p
          class="font-weight-medium"
          :class="size === 'large' ? 'text-subtitle-1' : 'text-body-2'"
        >
          {{ formattedPrice(item.price) }}
        </p>
        <button
          v-if="isFavorite"
          icon
          @click="toggleCart"
          style="padding: 0"
          :class="isInCart ? 'text-red' : 'text-teal'"
          variant="plain"
        >
          <Cart style="width: 18px" />
        </button>

        <button
          style="padding: 0"
          icon
          @click="$emit('remove', item.title)"
          variant="plain"
        >
          <Trash style="width: 14px" />
        </button>
      </div>
    </v-col>
  </v-row>
</template>
