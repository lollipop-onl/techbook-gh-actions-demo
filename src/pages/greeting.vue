<template lang="pug">
  .page-container
    VCard
      template(v-slot:header)
        | Thank you for purchasing!
      template(v-slot)
        p こんにちは、{{ name }}さん！
        p 本書をご購入いただきありがとうございます！
      template(v-slot:footer)
        n-link.footer-button(to="/") 名前を変更する
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import VCard from '@/components/VCard.vue';

@Component({
  components: {
    VCard
  }
})
export default class IndexPage extends Vue {
  /** 名前 */
  get name(): string | void {
    const { name } = this.$route.query;

    // クエリの値が文字列以外の場合は void を返す
    if (typeof name !== 'string') {
      return;
    }

    return decodeURIComponent(name);
  }

  /** ライフサイクル */
  beforeMount(): void {
    // 名前が空もしくはNullable値の場合はトップへリダイレクト
    if (!this.name) {
      this.$router.replace('/');
    }
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
</style>
