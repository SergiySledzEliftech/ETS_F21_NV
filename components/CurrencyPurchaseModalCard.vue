<template>
  <v-card
      class="dialog"
  >
    <currency-purchase-modal-header />
    <v-card-text>
      <div class="graph d-flex justify-center align-center">
        graph
      </div>

    </v-card-text>

    <v-card-text>
      <v-row>
        <v-col
          cols="6"
        >
          Your balance: {{ balance }}$
        </v-col>
        <v-col cols="6">
          Rate: {{ rate }}
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          Select currency:
          <v-autocomplete
            class="autocomplete"
            :items="currenciesSigns"
            v-model="currency"
            v-on:change="changeValues"
          >
          </v-autocomplete>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          Amount:
          <v-text-field
            id="amount-field"
            type="number"
            v-model="amount"
            :max="maxAmount"
          >
          </v-text-field>
          <v-slider
            class="slider"
            v-model="amount"
            :max="maxAmount"
            @change="changeCanBuy"
          ></v-slider>
        </v-col>
      </v-row>
    </v-card-text>
    <currency-purchase-modal-actions />
    
  </v-card>
</template>

<script>

import { Component, Vue, namespace, Prop } from "nuxt-property-decorator";
import CurrencyPurchaseModalHeader from './CurrencyPurchaseModalHeader.vue'
import CurrencyPurchaseModalActions from './CurrencyPurchaseModalActions.vue'

const {
  State: GlobalState,
  Action: GlobalAction // оставить state
} = namespace('globalCurrencies');
const {
  State: LocalState,
  Action: LocalAction //user currency state
} = namespace('userCurrencies');
const {
  State: ModalState,
  Action: ModalAction
} = namespace('purchaseModal');


@Component({})
export default class CurrencyPurchaseModalCard extends Vue {
  @GlobalState currenciesRates
  @GlobalState currenciesSigns
  @GlobalAction fetchGlobalCurrencies

  @LocalState balance
  @LocalAction fetchBalance

  @ModalState canBuy
  @ModalAction setCanBuy
  @ModalAction setModal

  @Prop({ type: String, required: true }) userId

  currency = null
  amount = null
  min = 0
  rate = null
  maxAmount = null

  changeValues () {
    const balance = this.balance;
    this.rate = this.currenciesRates[this.currency];
    this.maxAmount = Math.floor(balance * this.rate);
  }

  changeCanBuy () {
    this.setCanBuy(!!this.amount && !!this.currency)
  }
  
  async buyCurrency () {

  }

  async mounted () {
    this.fetchGlobalCurrencies();
    this.fetchBalance({ userId: this.userId });
  }
}

</script>

<style>
.amount > *:first-child {
  margin-right: 20px;
}

#amount-field {
  width: 60%;
}

.graph {
  border: 1px solid black;
  height: 250px;
}
</style>