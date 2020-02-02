<template lang="pug">
  input(
    v-bind="$attrs"
    v-on="listeners"
    :value="inputValue"
    ref="field"
  )
</template>

<script lang="ts">
import { Component, Emit, Model, Vue } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false
})
export default class VInput extends Vue {
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
  .v-input {
    & {
      display: inline-block;
      width: auto;
    }

    &:empty::before {
      content: attr(placeholder);
      opacity: 0.5;
      font-size: 1em;
    }
  }
</style>
