<template>
  <v-card-actions
    class="justify-space-between"
  >
    <v-btn
      color="indigo darken-1"
      :disabled="!getCanBuy"
    >
      Buy
    </v-btn>
    <v-btn
      @click="setModal(false)"
      color="red darken-1"
    >
      Close
    </v-btn>
  </v-card-actions>
</template>

<script>

import { Component, Vue, namespace, Prop, Watch } from "nuxt-property-decorator";
const {
  State: ModalState,
  Action: ModalAction,
  Getter: ModalGetter
} = namespace('purchaseModal');


@Component({})
export default class CurrencyPurchaseModalActions extends Vue {
  @ModalState canBuy
  @ModalAction setModal
  @ModalGetter getCanBuy
}

</script>