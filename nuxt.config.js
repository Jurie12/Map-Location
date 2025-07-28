import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: '%s - guiban-qr-app',
    title: 'guiban-qr-app',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: ['~/plugins/leaflet.js'],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv'
  ],

  axios: {
    baseURL: '/'
  },

  auth: {
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: '/auth/callback',
      home: '/map'
    },
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_CLIENT_URL,
        responseType: 'token id_token',
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: '', // disable PKCE for Google
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
        }
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUri: process.env.GITHUB_REDIRECT_URI,
        scope: ['read:user', 'user:email'],
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: '', // disable PKCE for GitHub
        endpoints: {
          authorization: 'https://github.com/login/oauth/authorize',
          token: 'https://github.com/login/oauth/access_token',
          userInfo: 'https://api.github.com/user'
        }
      }
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {}
}
