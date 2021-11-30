<template>
  <v-dialog
    v-model="modal"
    width="700"
    @click:outside="setModal(false)"
  >


    <currency-purchase-modal-card
      :userId="userId"
    />
    
  </v-dialog>
</template>

<script>
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import CurrencyPurchaseModalCard from './CurrencyPurchaseModalCard.vue'

const { State, Action } = namespace('purchaseModal')

@Component({
  components: { CurrencyPurchaseModalCard },
})
export default class CurrencyPurchaseModal extends Vue {
  @State modal
  @Action setModal

  @Prop({ type: String, required: true }) userId

  
}
</script>

<style>

</style>