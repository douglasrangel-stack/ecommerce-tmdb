<script setup>
import { mask } from "vue-the-mask";
import { watch, toRefs } from "vue";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:formData"]);

const { cep } = toRefs(props.formData);

function updateFormField(field, value) {
  emit("update:formData", { ...props.formData, [field]: value });
}

async function fetchAddress(cepValue) {
  try {
    const cleanCep = cepValue.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (data.erro) {
      updateFormField("endereco", "");
      updateFormField("cidade", "");
      updateFormField("estado", "");
      return;
    }

    updateFormField("endereco", data.logradouro || "");
    updateFormField("cidade", data.localidade || "");
    updateFormField("estado", data.uf || "");
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  }
}

function onCepBlur() {
  fetchAddress(props.formData.cep);
}
</script>

<script>
export default {
  directives: {
    mask,
  },
};
</script>

<style lang="scss">
.v-input__details {
  color: red;
  padding: 0;
  padding-inline: 0 !important;
  text-align: left;
  margin-bottom: 10px;
}
</style>

<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col cols="12" md="12">
        <h2 class="text-h4 font-weight-medium mb-4">Finalizar Compra</h2>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="formData.nome"
              label="Nome Completo"
              outlined
              dense
              :error="!!errors.nome"
              :error-messages="errors.nome"
              data-testid="input-nome"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.cpf"
              label="CPF"
              outlined
              dense
              v-mask="'###.###.###-##'"
              :error="!!errors.cpf"
              :error-messages="errors.cpf"
              data-testid="input-cpf"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.celular"
              label="Celular"
              outlined
              dense
              v-mask="'(##) #####-####'"
              :error="!!errors.celular"
              :error-messages="errors.celular"
              data-testid="input-celular"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="formData.email"
              label="E-mail"
              outlined
              dense
              type="email"
              :error="!!errors.email"
              :error-messages="errors.email"
              data-testid="input-email"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="formData.cep"
              label="CEP"
              outlined
              dense
              v-mask="'#####-###'"
              :error="!!errors.cep"
              :error-messages="errors.cep"
              @blur="onCepBlur"
              data-testid="input-cep"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="formData.endereco"
              label="Endereço"
              outlined
              dense
              :error="!!errors.endereco"
              :error-messages="errors.endereco"
              data-testid="input-endereco"
            />
          </v-col>
        </v-row>

        <!-- Cidade e Estado -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.cidade"
              label="Cidade"
              outlined
              dense
              :error="!!errors.cidade"
              :error-messages="errors.cidade"
              data-testid="input-cidade"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.estado"
              label="Estado"
              outlined
              dense
              :error="!!errors.estado"
              :error-messages="errors.estado"
              data-testid="input-estado"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
