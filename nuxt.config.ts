import { Configuration } from '@nuxt/types';

const { BASE_PATH = '/' } = process.env;

const config: Configuration = {
  // ビルドモード
  mode: 'spa',
  // ビルド設定
  build: {
    transpile: ['lodash-es'],
  },
  // ソースディレクトリパス
  srcDir: 'src',
  // headタグ内の項目
  head: {
    title: 'デモプロジェクト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://lollipop-onl.github.io/webfonts/Togalite.css',
      },
    ],
  },
  // グローバルCSSファイル
  css: ['reset-css', '@/assets/styles/main.scss'],
  // vue-router
  router: {
    mode: 'hash',
    base: BASE_PATH,
  },
  // ビルド時のみ使用するモジュール
  buildModules: ['@nuxt/typescript-build'],
  // Nuxt Module
  modules: ['@nuxtjs/style-resources'],
  // Nuxt Plugins
  plugins: ['@/plugins/constants'],
  // 全体で使用するCSSファイルを指定
  styleResources: {
    scss: [
      '@/assets/styles/vars.scss',
      '@/assets/styles/media.scss',
      '@/assets/styles/abstract.scss',
    ],
  },
};

module.exports = config;
