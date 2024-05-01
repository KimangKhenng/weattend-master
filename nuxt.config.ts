// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "@vite-pwa/nuxt",
    "nuxt-icon",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n"
  ],
  plugins: ["~/plugins/no-ssr.js"],
  i18n: {
    vueI18n: './i18n.config.ts' 
  },
  pwa: {
    manifest: {
      name: "WeAttend",
      short_name: "WeAttend",
      theme_color: "#ffffff",
      description: "Install WeAttend PWA on your homescreen.",
      icons: [
        {
          src: "https://cloudmariazona.vercel.app/pwaicons/weattend/64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "https://cloudmariazona.vercel.app/pwaicons/weattend/144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "https://cloudmariazona.vercel.app/pwaicons/weattend/192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "https://cloudmariazona.vercel.app/pwaicons/weattend/512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "",
      runtimeCaching: [
        {
          urlPattern: "http:\\/\\/localhost\\:3000",
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/confirm",
    },
  },
});