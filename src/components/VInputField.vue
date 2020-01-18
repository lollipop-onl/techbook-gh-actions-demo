<template lang="pug">
  .v-input-field
    label.label(for="name") あなたの名前は？
    .field
      input.input#name(
        v-bind="$attrs"
        v-on="listeners"
        :value="inputValue"
      )
    p.error(v-if="errorMessage") {{ errorMessage }}
    p.count(
      v-if="maxLength > 0"
      :class="{ '-caution': isOverMaxLength }"
    ) {{ inputLength }} / {{ maxLength }}
</template>

<script lang="ts">
import { Component, Emit, Prop, Model, Vue } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false
})
export default class VInputField extends Vue {
  /** v-model定義 */
  @Model('input', { type: String, required: true })
  inputValue!: string

  /** 最大入力文字数 */
  @Prop({ type: Number, default: 0 })
  maxLength!: number

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

  /** 入力値の文字数 */
  get inputLength (): number {
    return this.inputValue.length
  }

  /** 入力文字数が最大文字数を超過していないか */
  get isOverMaxLength (): boolean {
    return this.inputLength > this.maxLength
  }

  /** エラーメッセージ */
  get errorMessage (): string | void {
    if (this.isOverMaxLength) {
      return `${this.maxLength}文字以内で入力してください`
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
