<template lang="pug">
  .page-container
    .content
      VCard
        template(v-slot:header)
          | Thank you for purchasing!
        template(v-slot)
          .greeting-body
            p.greeting
              | こんにちは、
              b.name {{ name }}
              | さん！
            p.message
              span.merker(:class="{ '-marked': isMessageMarked }")
                | 本書をご購入いただきありがとうございます。
                | GitHub Actionsをお楽しみください！
        template(v-slot:footer)
          n-link.footer-button(to="/") 名前を変更する
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VCard from '@/components/VCard.vue'
import { sleep } from '@/utils'

@Component({
  components: {
    VCard
  }
})
export default class IndexPage extends Vue {
  /** マーカーを動作させるフラグ */
  isMessageMarked = false;

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

  /** ライフサイクル */
  async mounted (): Promise<void> {
    await sleep(1000)

    this.isMessageMarked = true
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  @extend %page-container;
}

.footer-button {
  @extend %base-button;
  @extend %base-button.-outline;
}

.greeting-body {
  & {
    font-size: $font-md;
  }

  & > .greeting {
    margin-bottom: $margin-md;
    line-height: 1.5;
  }

  & > .greeting > .name {
    margin-right: 0.3em;
    font-size: $font-lg;
  }

  & > .message {
    line-height: 1.8;
  }

  & > .message > .merker {
    @include marker-text;

    line-height: 1.8;
    white-space: pre-wrap;
  }
}
</style>
