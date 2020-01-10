<template lang="pug">
  div
    h1 Hello you
    form(@submit.prevent="onSubmit")
      v-input-field(
        v-model="name"
        placeholder="Taro"
      )
      p(v-if="isNameEmpty") 名前を入力してください
      p(v-else-if="isNameInvalid") 名前の入力値が不正です
      button(
        type="submit"
        :disabled="isNameInvalid"
      ) 決定
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VInputField from '@/components/VInputField.vue'

@Component({
  components: {
    VInputField
  }
})
export default class IndexPage extends Vue {
  /** 名前の入力値 */
  name = ''

  /** 名前が空文字かどうか */
  get isNameEmpty (): boolean {
    return this.name === ''
  }

  /** 名前の入力値が不正かどうか */
  get isNameInvalid (): boolean {
    return this.isNameEmpty || this.name.length > 100
  }

  /** URLエンコードされた名前 */
  get encodedName (): string {
    return encodeURIComponent(this.name)
  }

  /**
   * 決定ボタンが押されたときの処理
   */
  onSubmit (): void {
    if (this.isNameInvalid) {
      return
    }

    this.$router.push({
      path: 'greeting',
      query: {
        name: this.encodedName
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
