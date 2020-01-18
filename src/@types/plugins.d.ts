import * as C from '@/constants'

declare module 'vue/types/vue' {
  interface Vue {
    $C: typeof C
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $C: typeof C
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $C: typeof C
  }
}
