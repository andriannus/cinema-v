import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["@/assets/css/main.css"],
  devtools: {
    enabled: true,
  },
  srcDir: "src/",
  pages: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
