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
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class VCard extends Vue {
}
</script>

<style lang="scss" scoped>
  .v-card {
    & {
      background: $_white;
      padding-top: $margin-lg;
    }

    & > .header {
      padding: 0 $margin-lg;
      font-size: $font-heading;
    }

    & > .content {
      padding: 0 ($margin-xlg + $margin-lg);
      margin-top: $margin-lg;

      @media ($sp) {
        padding: 0;
      }
    }

    & > .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid $_border;
        padding: $margin-md $margin-lg;
      margin-top: $margin-lg;

        @media ($sp) {
          padding: 0;
        }
    }
  }
</style>
