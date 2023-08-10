// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  // custom tailwindcss path
  css: ['@/assets/css/main.css'],
  // server config variable
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
  // register nitro plugin
  nitro: {
    plugins: ['@/server/db/index.ts'],
  },
});
