<template>
  <div id="transaction-history-container">

    <v-row id="chart-options-container">
      <v-col
      cols="12"
      md="4"
      :style="[this.$vuetify.breakpoint.mdAndUp ? { 'padding': '30px', 'margin-top': '60px'} : {}]">
        <date-picker 
        :dateRange="dateRange"
        :updateDates ="updateDateRange"
        :formattedStateDates="formattedDateRange"/>

        <v-select 
        class="my-6" 
        :items="currencies" 
        v-model="currency" 
        label="Select currency" 
        dense/>

        <slider
        label="Rows on the page"
        :min="1"
        :max="30"
        :model="limitNumber"
        @changeModel="changeLimit"/>

        <gradient-rounded-button 
        text="Update transactions"
        :onClick="getTransactionHistory"/>
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

    <v-pagination 
    v-if="transactions.length !== 0" 
    v-model="page" 
    :length="pageCount" 
    @input="next"
    class="my-2"/>
    <v-data-table 
    :headers="headers" 
    :items="transactions" 
    class="elevation-1" 
    hide-default-footer/>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { Component, namespace, Vue, Watch, Inject } from 'nuxt-property-decorator'
import Chart from '../components/LineChart.vue'
import DatePicker from '../components/Datepicker.vue'
import GradientRoundedButton from '../components/GradientRoundedButton.vue'
import Slider from '../components/Slider.vue'

const { State, Action, Mutation, Getter } = namespace('transactionHistory');

export default @Component({
  components: {
    Chart,
    DatePicker,
    GradientRoundedButton,
    Slider,
  },
})

class TransactionHistory extends Vue{
  @Inject({default: null}) notificationsBar;

  @State transactions;
  @State pageCount;
  @State pageNumber;
  @State transactionDates;
  @State transactionAmounts;
  @State dateRange;
  @State limitNumber;

  @Getter formattedDateRange;

  @Action fetchTransactions;

  @Mutation updateDateRange;
  @Mutation updateLimitNumber;

  page = 1;
  currency = 'UAH';
  currencies = ['UAH', 'EUR', 'USD'];

  headers = [{ text: 'Currency', value: 'currencyName' },
             { text: 'Amount', value: 'amount' },
             { text: 'Date', value: 'date' },]

  head() {
    return {
      title: 'Transaction History',
    }
  }

  next(page) {}

  @Watch('pageNumber')
  changePage() {
    this.page = this.pageNumber;
  }

  changeLimit(limit) {
    this.updateLimitNumber(limit);
  }

  @Watch('page')
  async getTransactionHistory() {
    console.log('click')
    const page = this.page;
    const currency = this.currency;
    const limit = this.limitNumber;
    try {
      const params = { currency, page, limit };
      params.dateRange = this.dateRange.map(date => DateTime.fromFormat(date, 'yyyy-M-dd').toISO()).join('#');
      await this.fetchTransactions(params);
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }
  }

  async mounted() {
    this.updateLimitNumber(this.limitNumber);
    this.getTransactionHistory();
  }
}
</script>

<style scoped>
div#transaction-history-container {
  padding: 10px;
}
</style>
