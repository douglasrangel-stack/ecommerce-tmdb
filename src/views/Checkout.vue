<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { usePriceFormatter } from "../composables/usePriceFormatter";

import FormCheckout from "../components/FormCheckout.vue";
import ResumeCart from "../components/ResumeCart.vue";
import Modal from "../components/Modal.vue";

onMounted(() => {
  document.title = "Checkout";
});

const store = useStore();
const { formattedPrice } = usePriceFormatter();
const showModal = ref(false);

const formData = reactive({
  nome: "",
  celular: "",
  cpf: "",
  email: "",
  cep: "",
  endereco: "",
  estado: "",
  cidade: "",
});

const errors = reactive({
  nome: "",
  celular: "",
  cpf: "",
  email: "",
  cep: "",
  endereco: "",
  estado: "",
  cidade: "",
});

const cartItems = computed(() => store.getters.cartItems);
const totalPrice = computed(() => store.getters.totalPrice);

const removeFromCart = (title) => {
  store.commit("REMOVE_FROM_CART", title);
};

const updateFormData = (newFormData) => {
  Object.assign(formData, newFormData);
};

const validateField = (field) => {
  const value = formData[field];
  let message = "";

  switch (field) {
    case "nome":
      if (!value.trim()) message = "Nome é obrigatório";
      break;
    case "celular":
      if (!value) message = "Celular é obrigatório";
      else if (value.replace(/\D/g, "").length !== 11)
        message = "Celular inválido";
      break;
    case "cpf":
      if (!value) message = "CPF é obrigatório";
      else if (value.replace(/\D/g, "").length !== 11) message = "CPF inválido";
      break;
    case "email":
      if (!value) message = "E-mail é obrigatório";
      else if (!/\S+@\S+\.\S+/.test(value)) message = "E-mail inválido";
      break;
    case "cep":
      if (!value) message = "CEP é obrigatório";
      else if (value.replace(/\D/g, "").length !== 8) message = "CEP inválido";
      break;
    case "endereco":
      if (!value.trim()) message = "Endereço é obrigatório";
      break;
    case "estado":
      if (!value) message = "Estado é obrigatório";
      break;
    case "cidade":
      if (!value.trim()) message = "Cidade é obrigatória";
      break;
  }

  errors[field] = message;
  return !message;
};

const handleSubmit = () => {
  if (cartItems.value.length === 0) {
    alert("O carrinho não pode estar vazio!");
    return;
  }

  let isValid = true;
  Object.keys(formData).forEach((field) => {
    if (!validateField(field)) isValid = false;
  });

  if (isValid) {
    const cleanData = {
      ...formData,
      celular: formData.celular.replace(/\D/g, ""),
      cpf: formData.cpf.replace(/\D/g, ""),
      cep: formData.cep.replace(/\D/g, ""),
    };

    Object.keys(formData).forEach((key) => {
      formData[key] = "";
    });

    showModal.value = true;
  }
};
</script>

<template>
  <v-app>
    <main
      style="width: 1200px; max-width: 100%"
      class="container mx-auto py-8 pt-40 sm:px-4 sm:pt-32"
    >
      <v-container class="pt-16">
        <v-row>
          <v-col cols="12" lg="6">
            <FormCheckout
              :formData="formData"
              :errors="errors"
              @update:formData="updateFormData"
            />
          </v-col>

          <v-col cols="12" lg="6">
            <ResumeCart
              :cartItems="cartItems"
              :totalPrice="totalPrice"
              :formattedPrice="formattedPrice"
              :handleSubmit="handleSubmit"
              :removeFromCart="removeFromCart"
            />
          </v-col>
        </v-row>

        <Modal :isOpen="showModal" />
      </v-container>
    </main>
  </v-app>
</template>
