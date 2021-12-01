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
          Rate: {{ getRate }}
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          Select currency:
          <Selector
            :itemsList="currenciesSigns"
            :setStoreValueFunction="setCurrencyName"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          Amount:
          <v-text-field
            id="amount-field"
            type="number"
            v-model="localAmount"
            :max="localMaxAmount"
          >
          </v-text-field>
          <v-slider
            class="slider"
            v-model="localAmount"
            :max="localMaxAmount"
            @change="changeCanBuy"
          ></v-slider>
        </v-col>
      </v-row>
    </v-card-text>
    <currency-purchase-modal-actions
      :userId="userId"
    />
  </v-card>
</template>

<script>

import { Component, Vue, namespace, Prop, Watch } from "nuxt-property-decorator";
import CurrencyPurchaseModalHeader from './CurrencyPurchaseModalHeader.vue';
import CurrencyPurchaseModalActions from './CurrencyPurchaseModalActions.vue';
import Selector from './Selector.vue';

const {
  State,
  Action
} = namespace('globalCurrencies');
const {
  State: UserCurrenciesState,
  Action: UserCurrenciesAction //user currency state
} = namespace('userCurrencies');
const {
  State: ModalState,
  Action: ModalAction,
  Getter: ModalGetter
} = namespace('purchaseModal');


@Component({
  components: {
    CurrencyPurchaseModalHeader,
    CurrencyPurchaseModalActions,
    Selector
  }
})
export default class CurrencyPurchaseModalCard extends Vue {
  @State currenciesRates
  @State currenciesSigns
  @Action fetchGlobalCurrencies

  @UserCurrenciesState balance
  @UserCurrenciesAction fetchBalance

  @ModalState canBuy
  @ModalState currencyName
  @ModalAction setCurrencyName
  @ModalAction setCanBuy
  @ModalAction setModal
  @ModalAction setAmount
  @ModalAction setRate
  @ModalGetter getAmount
  @ModalGetter getRate

  @Prop({ type: String, required: true }) userId

  localAmount = null
  localRate = null
  localMaxAmount = null

  @Watch('currencyName')
  @Watch('localAmount')
  changeValues () {
    console.log(this.currencyName)
    console.log(this.localAmount)
    const balance = this.balance;
    this.localRate = this.currenciesRates[this.currencyName];
    this.localMaxAmount = Math.floor(balance * this.localRate);
    this.setAmount(this.localAmount);
    this.setRate(this.localRate);
  }

  changeCanBuy () {
    this.setCanBuy(!!this.localAmount && !!this.currencyName)
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