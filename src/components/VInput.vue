<template lang="pug">
  .v-input
    input.field(
      v-bind="$attrs"
      v-on="listeners"
      :value="inputValue"
      ref="field"
    )
    .border
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
    font-size: $font-lg;
    line-height: 1.8;
    background: none;
    border: none;
    outline: none;
  }

  & > .border {
    position: relative;
    width: 100%;
    height: 2px;
    background: $_border;
  }

  & > .border::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: $_primary;
    transition: transform 0.24s ease;
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }

  & > .field:focus + .border::before {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
}
</style>
