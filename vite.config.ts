import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), vuetify({ autoImport: true })],
});
