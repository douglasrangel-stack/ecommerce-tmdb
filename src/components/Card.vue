<script setup lang="ts">
import { computed } from "vue";
import ImageDefault from "../assets/icons/ImageDefault.svg";
import Star from "../assets/icons/Star.svg";
import Heart from "../assets/icons/Heart.svg";
import { useCart } from "../composables/useCart";
import { useFavorites } from "../composables/useFavorites";
import { usePriceFormatter } from "../composables/usePriceFormatter";

interface Props {
  title?: string;
  genre?: string;
  image?: string;
  releaseDate?: string;
  rating?: number;
  price?: number;
}

const props = defineProps<Props>();

const { isInCart, toggleCart } = useCart(
  props.title ?? "",
  props.image ?? "",
  props.price ?? 0
);
const { isInFavorites, toggleFavorites } = useFavorites(
  props.title ?? "",
  props.image ?? "",
  props.price ?? 0
);

const { formattedPrice } = usePriceFormatter();

const formattedPriceLabel = computed(() => formattedPrice(props.price ?? 0));

const formattedReleaseDate = computed(() => {
  if (!props.releaseDate) return "Data desconhecida";

  const date = new Date(props.releaseDate);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
});
</script>

<style scoped lang="scss">
.icon-heart {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 0;
  width: 25px;
  height: 25px;
  outline: none;
  svg {
    width: 25px;
  }
  &.active {
    color: red;
  }
}

.w-card {
  width: calc(25% - 20px);
  @media (max-width: 767px) {
    width: calc(50% - 20px);
  }
}

.w-card-image {
  aspect-ratio: 9 / 15;
}
</style>

<template>
  <div class="border border-black w-card">
    <div class="position-relative border-b border-black w-card-image">
      <button
        @click="toggleFavorites"
        class="icon-heart"
        :class="isInFavorites ? 'active' : ''"
      >
        <Heart />
      </button>

      <img
        :src="image"
        :alt="title"
        class="h-auto w-full rounded-t-sm object-top"
        v-if="image"
      />
      <div
        v-else
        class="flex h-52 items-center justify-center rounded-t-sm bg-gray-300 sm:h-[260px] md:h-[340px] lg:h-[440px]"
      >
        <ImageDefault />
      </div>

      <p
        class="absolute bottom-0 m-auto w-full rounded py-1 text-center text-xs font-semibold sm:text-sm"
      >
        {{ formattedReleaseDate }}
      </p>
    </div>

    <div>
      <h2 class="text-center text-h6 font-weight-bold" style="min-height: 64px">
        {{ title }}
      </h2>
      <div class="mt-2 d-flex items-center justify-center gap-4">
        <div class="d-flex items-center justify-center mr-2">
          <Star style="width: 20px" />
          <strong class="text-sm font-bold sm:text-lg ml-1">{{
            rating?.toFixed(1)
          }}</strong>
        </div>
        <p class="line-clamp-1 text-xs font-medium sm:text-sm">{{ genre }}</p>
      </div>
      <p class="sm:text-md mt-2 text-center text-sm font-semibold">
        {{ formattedPriceLabel }}
      </p>
    </div>

    <button
      @click="toggleCart"
      class="mt-2 w-100 rounded-0"
      :class="
        isInCart
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-[#6558f5] hover:bg-[#584ec5]'
      "
      :style="{
        backgroundColor: isInCart
          ? '#ff5252' /* vermelho padrão Vuetify */
          : '#6558f5',
        color: 'white',
      }"
    >
      {{ isInCart ? "Remover" : "Adicionar" }}
    </button>
  </div>
</template>
