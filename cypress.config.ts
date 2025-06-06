const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // ou a porta do seu projeto
    setupNodeEvents(on, config) {
      // suporte a plugins aqui se necessário
    },
  },
});
