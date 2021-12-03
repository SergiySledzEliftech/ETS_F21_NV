<template>
  <v-card>
    <v-card-header>
    <currency-purchase-modal-header />
    </v-card-header>
    <v-card-text>
      <Chart
        :dataLabels="dates" 
        :dataArray="rates"
        :lineLabels="labels"
        style="{display: block; height: 300px; width: 500px}"
      />
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

import { Component, Vue, namespace, Prop, Watch, Inject } from "nuxt-property-decorator";
import CurrencyPurchaseModalHeader from './CurrencyPurchaseModalHeader.vue';
import CurrencyPurchaseModalActions from './CurrencyPurchaseModalActions.vue';
import Selector from './Selector.vue';
import Chart from './LineChart.vue';

import { DateTime } from 'luxon';

const {
  State,
  Action
} = namespace('globalCurrencies');
const {
  State: UserCurrenciesState,
  Action: UserCurrenciesAction
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
    Selector,
    Chart
  }
})
export default class CurrencyPurchaseModalCard extends Vue {
  @Inject({default: null}) notificationsBar;

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

  dates = [this.getDateForChart(6), this.getDateForChart(5), this.getDateForChart(4) ,this.getDateForChart(3), this.getDateForChart(2), this.getDateForChart(1)]
  rates = [[26, 26, 26, 26, 26, 26]]
  labels = ['UAH']

  @Watch('currencyName')
  @Watch('localAmount')
  changeValues () {
    console.log('lol')
    const balance = this.balance;
    this.localRate = this.currenciesRates[this.currencyName];
    this.localMaxAmount = Math.floor(balance * this.localRate);
    this.setAmount(this.localAmount);
    this.setRate(this.localRate);
  }

  getDateForChart (daysBack) {
    return DateTime.now().minus({ days: daysBack }).toFormat('yyyy-M-dd');
  }

  @Watch('currencyName')
  @Watch('getAmount')
  changeCanBuy () {
    console.log(this.currencyName)
    this.setCanBuy(!!this.getAmount && !!this.currencyName)
  }

  async mounted () {
    this.fetchGlobalCurrencies();
    this.fetchBalance({ userId: this.userId });
    console.log(this.dates);
    this.notificationsBar.consoleError('pidj');
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