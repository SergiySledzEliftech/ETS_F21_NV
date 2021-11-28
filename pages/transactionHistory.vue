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
        :updateDates="updateDateRange"/>

        <v-select 
        class="my-6" 
        :items="currencies" 
        v-model="currency" 
        label="Select currency" 
        dense
        :disabled="loading"/>

        <slider
        label="Rows on the page"
        :min="1"
        :max="30"
        :model="limitNumber"
        :disabled="loading"
        @changeModel="changeLimit"/>

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

    <pagination 
    v-if="transactions.length !== 0" 
    :model="page"
    :pageCount="pageCount"
    @onPageChange="onPageChange"
    :disabled="loading"/>
    <div class="data-table-holder">
      <data-table
      :headers="headers"
      :data="transactions"
      class="elevation-1"
      :needSearch="false"
      hide-default-footer/>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { Component, namespace, Vue, Watch, Inject } from 'nuxt-property-decorator'
import Chart from '../components/LineChart.vue'
import DatePicker from '../components/Datepicker.vue'
import GradientRoundedButton from '../components/GradientRoundedButton.vue'
import Slider from '../components/Slider.vue'
import DataTable from '../components/DataTable.vue'
import Pagination from '../components/Pagination.vue'

const { State, Action, Mutation, Getter } = namespace('transactionHistory');

export default @Component({
  components: {
    Chart,
    DatePicker,
    GradientRoundedButton,
    Slider,
    DataTable,
    Pagination
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

  @Getter formatDates;

  @Action fetchTransactions;

  @Mutation updateDateRange;
  @Mutation updateLimitNumber;

  page = 1;
  loading = false;
  currency = 'UAH';
  currencies = ['UAH', 'EUR', 'USD'];

  headers = [{ text: 'Currency', value: 'currencyName' },
             { text: 'Amount', value: 'amount' },
             { text: 'Date', value: 'date' },
             { text: 'Rate', value: 'rate'},
             { text: 'Spent', value: 'spent'}]

  head() {
    return {
      title: 'Transaction History',
    }
  }

  @Watch('pageNumber')
  changePage() {
    this.page = this.pageNumber;
  }

  changeLimit(limit) {
    this.updateLimitNumber(limit);
  }

  @Watch('page')
  async getTransactionHistory() {
    this.loading = true;
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
    this.loading = false;
  }

  mounted() {
    this.updateLimitNumber(this.limitNumber);
    this.getTransactionHistory();
  }

  onPageChange(page) {
    this.page = page;
  }
}
</script>

<style scoped>
div#transaction-history-container {
  padding: 10px;
}

div.data-table-holder {
  height: 283px;
  overflow: scroll;
}
</style>
