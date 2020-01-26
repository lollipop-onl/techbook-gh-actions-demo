<template lang="pug">
  .page
    h1.page__title hello
    .page__content
      .greeting
        .greeting__name こんにちは、{{ name }}さん！
        n-link.greeting__link(to="/") 名前を変更する
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  /** 名前 */
  get name (): string | void {
    const { name } = this.$route.query

    // クエリの値が文字列以外の場合は void を返す
    if (typeof name !== 'string') {
      return
    }

    return decodeURIComponent(name)
  }

  /** ライフサイクル */
  beforeMount (): void {
    // 名前が空もしくはNullable値の場合はトップへリダイレクト
    if (!this.name) {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    @extend %page-container;
  }
</style>
