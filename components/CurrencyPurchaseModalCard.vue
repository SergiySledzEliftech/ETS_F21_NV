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
          v-if="balance"
          cols="6"
        >
          Your balance: {{ balance.toFixed(2) }}$
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
            type="number"
            v-model="localAmount"
            :max="localMaxAmount"
          >
          </v-text-field>
          <v-slider
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
import { serverUrl } from '../utils/config';

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

  numberOfMonthsForChart = 7

  dates = [this.getDateForChart(7), this.getDateForChart(6), this.getDateForChart(5), this.getDateForChart(4) ,this.getDateForChart(3), this.getDateForChart(2), this.getDateForChart(1)]
  rates = [[520.45, 495.36, 489.41, 493.36, 490.44, 477.87, 489.76]]
  labels = ['UAH']

  @Watch('currencyName')
  @Watch('localAmount')
  changeValues () {
    const balance = this.balance;
    this.localRate = this.currenciesRates[this.currencyName];
    this.localMaxAmount = Math.floor(balance * this.localRate);
    this.setAmount(this.localAmount);
    this.setRate(this.localRate);
  }

  getDateForChart (monthsBack) {
    return DateTime.now().minus({ month: monthsBack }).toFormat('yyyy-M-dd');
  }

  @Watch('currencyName')
  @Watch('getAmount')
  changeCanBuy () {
    this.setCanBuy(!!this.getAmount && !!this.currencyName)
  }

  async mounted () {
    this.fetchGlobalCurrencies();
    this.fetchBalance({ userId: this.userId });
    this.notificationsBar.consoleError('pidj');
  }

  @Watch('currencyName')
  async getDataForChart () {
    let localDates = [];
    let localRates = [];
    const localLabels = [this.currencyName];
    for(let i = 0; i < this.numberOfMonthsForChart; i++) {
      const date = this.getDateForChart(i);
      const rateObj = await this.$axios
        .$get(serverUrl + '/globalCurrencies/history', {
          params: {
            date,
            currency: this.currencyName
          }
        });
      if (rateObj) {
        localRates.unshift(Number(rateObj[this.currencyName].toFixed(2)));
      } else {
        localRates.unshift(0);
      }
      localDates.unshift(date);
    }
    this.rates[0] = localRates;
    this.labels = localLabels;
    this.dates = localDates;
  }
}

</script>