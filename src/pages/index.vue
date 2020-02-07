<template lang="pug">
  .page-container
    .content
      form(@submit.prevent="onSubmit")
        VCard
          template(v-slot:header)
            | Welcome !
          template(v-slot)
            .form-field
              label.label(for="46Juzcyx") 名前を入力してください
              v-input.input#46Juzcyx(
                v-model="name"
                placeholder="Taro"
                :maxLength="$C.MAX_NAME_LENGTH"
              )
          template(v-slot:footer)
            button.submit-button(
              type="submit"
              :disabled="isNameInvalid"
            ) 次へすすむ
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { castArray } from 'lodash-es';
import VInput from '@/components/VInput.vue';
import VCard from '@/components/VCard.vue';

@Component({
  components: {
    VInput,
    VCard,
  },
})
export default class IndexPage extends Vue {
  /** 名前の入力値 */
  name = '';

  /** 名前の初期値 */
  get defaultName(): string {
    const name = castArray(this.$route.query.name)[0];

    if (name == null) {
      return '';
    }

    return name;
  }

  /** 名前が空文字かどうか */
  get isNameEmpty(): boolean {
    return this.name === '';
  }

  /** 名前の入力値が不正かどうか */
  get isNameInvalid(): boolean {
    return this.isNameEmpty || this.name.length > this.$C.MAX_NAME_LENGTH;
  }

  /** URLエンコードされた名前 */
  get encodedName(): string {
    return encodeURIComponent(this.name);
  }

  /** Lifecycle hook */
  beforeMount(): void {
    this.name = this.name || this.defaultName;
  }

  /**
   * 決定ボタンが押されたときの処理
   */
  onSubmit(): void {
    if (this.isNameInvalid) {
      return;
    }

    this.$router.push({
      path: 'greeting',
      query: {
        name: this.encodedName,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  @extend %page-container;
}

.form-field {
  & > .label {
    display: block;
    font-size: $font-md;
  }

  & > .input {
    margin-top: $margin-sm;
  }
}

.submit-button {
  @extend %base-button;
  @extend %base-button.-primary;
}
</style>
