import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'

require('dotenv').config()

export default {
  head: {
    title: 'top',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: [
    {
      src: '~/assets/main.css'
    },
    {
      src: '~/assets/tailwind.css'
    }
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  modules: ['@nuxtjs/pwa', '@nuxtjs/dotenv'],

  build: {
    extend(config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },

  plugins: [
    '~/plugins/firebase.ts',
    '~/plugins/j-stylebook.ts',
    '~/plugins/cookie.ts'
  ],

  env: {
    NUXT_APP_API_KEY: process.env.NUXT_APP_API_KEY,
    NUXT_APP_AUTH_DOMAIN: process.env.NUXT_APP_AUTH_DOMAIN,
    NUXT_APP_PROJECT_ID: process.env.NUXT_APP_PROJECT_ID
  }
}
