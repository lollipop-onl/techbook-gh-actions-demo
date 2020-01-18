<template lang="pug">
  .v-input-field(
    v-on="listeners"
    ref="field"
    :placeholder="placeholder"
    contenteditable="true"
  )
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Model, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false
})
export default class VInputField extends Vue {
  /** v-model定義 */
  @Model('input', { type: String, required: true })
  inputValue!: string

  /** Placeholder */
  @Prop({ type: String })
  placeholder?: string

  /** FieldRef */
  @Ref('field')
  fieldElement?: HTMLDivElement

  /** v-modelのイベントリスナを仕込んだ $listeners */
  get listeners (): Record<string, Function | Function[]> {
    return {
      ...this.$listeners,
      input: (event: Event): void => {
        const { target } = event

        if (!(target instanceof HTMLDivElement)) {
          return
        }

        const { textContent } = target

        this.input(textContent || '')
      }
    }
  }

  /** inputValueと実際のデータがずれたら修正する */
  @Watch('inputValue')
  onInputValueChanged (inputValue: string): void {
    if (!this.fieldElement) {
      return
    }

    const { textContent } = this.fieldElement

    if (textContent === inputValue) {
      return
    }

    this.fieldElement.textContent = inputValue
  }

  /** Lifecycle hook */
  mounted (): void {
    if (!this.fieldElement) {
      return
    }

    this.fieldElement.textContent = this.inputValue
  }

  /** 入力値の変更をEmitする */
  @Emit()
  input (inputValue: string): string {
    console.log('emit')

    return inputValue
  }
}
</script>

<style lang="scss" scoped>

</style>
