<template lang="pug">
  div
    label(for="name") あなたの名前は？
    input#name(
      v-bind="$attrs"
      v-on="listeners"
      :value="inputValue"
    )
</template>

<script lang="ts">
import { Component, Emit, Model, Vue } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false
})
export default class VInputField extends Vue {
  /** v-model定義 */
  @Model('input', { type: String, required: true })
  inputValue!: string

  /** v-modelのイベントリスナを仕込んだ $listeners */
  get listeners (): Record<string, Function | Function[]> {
    return {
      ...this.$listeners,
      input: (event: Event): void => {
        const { target } = event

        if (!(target instanceof HTMLInputElement)) {
          return
        }

        const { value } = target

        this.input(value)
      }
    }
  }

  /** 入力値の変更をEmitする */
  @Emit()
  input (inputValue: string): string {
    return inputValue
  }
}
</script>

<style lang="scss" scoped>
</style>
