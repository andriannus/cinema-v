import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nuxt-icons'],
  pages: true,
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      tmdbAPIToken: process.env.NUXT_TMDB_API_TOKEN,
      tmdbServiceURL: process.env.NUXT_TMDB_SERVICE_URL,
    },
  },
  srcDir: 'src/',
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
});
