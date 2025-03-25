// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  devServer: {
    port: process.env.NITRO_PORT ? +process.env.NITRO_PORT : 4015,
  },

  modules: ['@nuxt/eslint'],

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/scss/vuetify.scss',
  ],

  build: {
    transpile: ['vuetify'],
  },

  routeRules: {
    '/': { redirect: '/catalog' },
  },
})
