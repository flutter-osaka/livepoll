import UniversalCookie from 'universal-cookie'

/**
 * Vue.prototype
 */
declare module 'vue/types/vue' {
  interface Vue {
    $cookie: UniversalCookie
  }
}

/**
 * context.app
 */
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $cookie: UniversalCookie
  }
  interface Context {
    $cookie: UniversalCookie
  }
}

/**
 * vuex usage
 */
declare module 'vuex/types/index' {
  interface Store<S> {
    $cookie: UniversalCookie
  }
}

/**
 * Atomic stylebook
 */
declare module '@nekohack/j-stylebook' {
  //
}
