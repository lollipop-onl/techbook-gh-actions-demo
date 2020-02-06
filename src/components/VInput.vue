<template lang="pug">
  .v-input
    input.field(
      v-bind="$attrs"
      v-on="listeners"
      :value="inputValue"
      ref="field"
    )
</template>

<script lang="ts">
import { Component, Emit, Model, Vue } from 'nuxt-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class VInput extends Vue {
  /** v-model定義 */
  @Model('input', { type: String, required: true })
  inputValue!: string;

  /** v-modelのイベントリスナを仕込んだ $listeners */
  get listeners(): Record<string, Function | Function[]> {
    return {
      ...this.$listeners,
      input: (event: Event): void => {
        const { target } = event;

        if (!(target instanceof HTMLInputElement)) {
          return;
        }

        const { value } = target;

        this.input(value);
      },
    };
  }

  /** 入力値の変更をEmitする */
  @Emit()
  input(inputValue: string): string {
    return inputValue;
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  & > .field {
    width: 100%;
    height: 100%;
    font-size: $font-lg;
    border: none;
    background: none;
  }
}
</style>
