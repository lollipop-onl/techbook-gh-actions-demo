<template lang="pug">
  .v-card
    .header
      slot(name="header")
    .content
      slot
    .footer
      slot(name="footer")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class VCard extends Vue {}
</script>

<style lang="scss" scoped>
.v-card {
  & {
    @include card-shadow;

    padding-top: $margin-lg;
    background: $_white;
    border-radius: 4px;
  }

  & > .header {
    padding: 0 $margin-lg;
    font-size: $font-heading;
    line-height: 1.5;

    @media ($sp) {
      padding: 0 $margin-lg;
    }
  }

  & > .content {
    padding: 0 ($margin-xlg + $margin-lg);
    margin-top: $margin-lg;

    @media ($sp) {
      padding: 0 $margin-lg;
      margin-top: $margin-xlg;
    }
  }

  & > .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: $margin-md $margin-lg;
    margin-top: $margin-lg;
    border-top: 1px solid $_border;

    @media ($sp) {
      padding: $margin-sm $margin-md;
      margin-top: $margin-xlg;
    }
  }
}
</style>
