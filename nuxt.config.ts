import { Configuration } from '@nuxt/types'

const config: Configuration = {
  // ビルドモード
  mode: 'spa',
  // ソースディレクトリパス
  srcDir: 'src',
  // headタグ内の項目
  head: {
    title: 'デモプロジェクト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  // グローバルCSSファイル
  css: [],
  // vue-router
  router: {
    mode: 'hash',
    base: './'
  },
  // ビルド時のみ使用するモジュール
  buildModules: [
    '@nuxt/typescript-build'
  ],
  // Nuxt Module
  modules: [
    '@nuxtjs/style-resources'
  ],
  // 全体で使用するCSSファイルを指定
  styleResources: {
    scss: []
  }
}

module.exports = config
