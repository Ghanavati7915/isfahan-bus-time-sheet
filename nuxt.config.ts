// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "مینی اپلیکیشن اطلاع رسانی خدمات حمل و نقل اصفهان",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=no" },
        { name: "HandheldFriendly", content: "true" },
        { name: "version", content: "bale 0.1" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/img/logo.ico" },
        { rel: "apple-touch-icon", href: "/img/pwa/android/android-launchericon-192-192.png" },
        { rel: "apple-touch-startup-image", href: "/img/pwa/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png" },
      ],
      script: [],
    },
    rootAttrs: {
      'vaul-drawer-wrapper': '',
      'class': 'bg-(--ui-bg)'
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  css: ["@/public/css/main.css", "@/public/css/font.css"],
  modules: [
    'cap-module',
    '@nuxt/ui',
  ],
})