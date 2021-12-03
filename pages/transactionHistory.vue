<template>
  <div id="transaction-history-container">
    <v-row id="chart-options-container">
      <v-col
      cols="12"
      md="4"
      :style="[this.$vuetify.breakpoint.mdAndUp ? { 'padding': '30px', 'margin-top': '60px'} : {}]">
        <date-picker
        :stateDates="dateRange"
        :formattedStateDates="formatDates"
        :updateDates="updateDateRange"
        :isDisabled="loading"/>
        
        <selector
        class="my-6"
        :disabled="loading"
        label="Select currency"
        :defaultValue="currency"
        :itemsList="currenciesSigns"
        :setStoreValueFunction="setCurrencyName"/>

        <gradient-rounded-button 
        text="Update transactions"
        :onClick="getTransactionHistory"
        :loading="loading"/>
      </v-col>

      <v-col
      cols="12"
      md="8"
      xs="8"
      :style="[{'overflow': 'scroll'}]">
        <chart 
        :dataLabels="transactionDates" 
        :dataArray="[[...transactionAmounts]]"
        :lineLabels="[currency]"
        chartTitle="Transactions"
        class="pa-10"
        :style="[!this.$vuetify.breakpoint.mdAndUp ? { 'width': '400px', 'height': '400px'} : {}]"/>
      </v-col>
    </v-row>

    <data-table
    :headers="headers"
    :data="transactions"
    class="elevation-1"
    :needSearch="false"
    height="283px"
    :numberOfPages="pageCount"
    :limitNumber="limitNumber"
    :pageNumber="pageNumber"
    @onPageChange="onPageChange"
    @onLimitChange="changeLimit"/>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { Component, namespace, Vue, Watch, Inject } from 'nuxt-property-decorator'

import Chart from '../components/LineChart.vue'
import DatePicker from '../components/Datepicker.vue'
import GradientRoundedButton from '../components/GradientRoundedButton.vue'
import DataTable from '../components/DataTable.vue'
import Selector from '../components/Selector.vue'

import headMixin from '~/helpers/mixins/headMixin'

const { State, Action, Mutation, Getter } = namespace('transactionHistory');
const { State: GlobalCurrencyState, Action: GlobalCurrencyAction } = namespace('globalCurrencies');

@Component({
  components: {
    Chart,
    DatePicker,
    GradientRoundedButton,
    DataTable,
    Selector
  },
  mixins: [headMixin]
})

export default class TransactionHistory extends Vue{
  @Inject({default: null}) notificationsBar;

  @State transactions;
  @State pageCount;
  @State pageNumber;
  @State transactionDates;
  @State transactionAmounts;
  @State dateRange;
  @State limitNumber;
  @State currency;
  @GlobalCurrencyState currenciesSigns;

  @Getter formatDates;

  @Action fetchTransactions;
  @GlobalCurrencyAction fetchGlobalCurrencies;

  @Mutation updateDateRange;
  @Mutation updateLimitNumber;
  @Mutation updateCurrency;
  @Mutation updatePageNumber;

  loading = false;
  title = 'Transaction History';

  headers = [{ text: 'Currency', value: 'currencyName' },
             { text: 'Amount', value: 'amount' },
             { text: 'Date', value: 'date' },
             { text: 'Rate', value: 'rate'},
             { text: 'Spent', value: 'spent'}];

  changeLimit(limit) {
    this.updateLimitNumber(limit);
    this.onPageChange(1);
  }

  setCurrencyName(currency) {
    this.updateCurrency(currency);
  }

  @Watch('page')
  async getTransactionHistory() {
    this.loading = true;
    const page = this.pageNumber;
    const currency = this.currency;
    const limit = this.limitNumber;
    console.log(limit);
    try {
      const params = { currency, page, limit };
      params.dateRange = this.dateRange.map(date => DateTime.fromFormat(date, 'yyyy-M-dd').toISO()).join('#');
      await this.fetchTransactions(params);
    } catch (err) {
      this.notificationsBar.consoleError(err.message);
    }
    this.loading = false;
  }

  async mounted() {
    this.updateLimitNumber(this.limitNumber);
    this.getTransactionHistory();

    try {
      await this.fetchGlobalCurrencies();
    } catch (err) {
      this.notificationsBar.consoleError(err.message);
    }
  }

  onPageChange(page) {
    this.updatePageNumber(page);
    this.getTransactionHistory()
  }
}
</script>

<style scoped>
div#transaction-history-container {
  padding: 10px;
}
</style>
