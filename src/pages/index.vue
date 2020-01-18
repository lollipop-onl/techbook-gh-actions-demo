<template lang="pug">
  div
    h1 Hello you
    form(@submit.prevent="onSubmit")
      v-input(
        v-model="name"
        placeholder="Taro"
        :maxLength="$C.MAX_NAME_LENGTH"
      )
      pre {{name}}
      button(
        type="submit"
        :disabled="isNameInvalid"
      ) 決定
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { castArray } from 'lodash-es'
import VInput from '@/components/VInput.vue'

@Component({
  components: {
    VInput
  }
})
export default class IndexPage extends Vue {
  /** 名前の入力値 */
  name = ''

  /** 名前の初期値 */
  get defaultName (): string {
    const name = castArray(this.$route.query.name)[0]

    if (name == null) {
      return ''
    }

    return name
  }

  /** 名前が空文字かどうか */
  get isNameEmpty (): boolean {
    return this.name === ''
  }

  /** 名前の入力値が不正かどうか */
  get isNameInvalid (): boolean {
    return this.isNameEmpty || this.name.length > this.$C.MAX_NAME_LENGTH
  }

  /** URLエンコードされた名前 */
  get encodedName (): string {
    return encodeURIComponent(this.name)
  }

  /** Lifecycle hook */
  beforeMount (): void {
    this.name = this.name || this.defaultName
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
