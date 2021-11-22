<template>
  <div>
    <chart :dataLabels="transactionDates" 
      :dataArray="[[...transactionAmounts]]"
      :lineLabels="[currency]"
      chartTitle="Transactions"
      class="pa-10"/>
    <v-row align="center">
      <v-col class="d-flex" cols="6" sm="6">
        <v-select class="my-6" :items="currencies" v-model="currency" label="Select currency!" dense/>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="transactions" class="elevation-1" hide-default-footer/>
    <v-pagination v-model="page" :length="pageCount" @input="next"/>
  </div>
</template>

<script>
import { Component, namespace, Vue, Watch, Inject } from 'nuxt-property-decorator'
import Chart from '../components/LineChart.vue'

const { State, Action } = namespace('transactionHistory');

export default @Component({
  components: {
      Chart,
  },
})

class TransactionHistory extends Vue{
  @Inject({default: null}) notificationsBar;

  @State transactions;
  @State pageCount;
  @State transactionDates;
  @State transactionAmounts;
  @Action fetchTransactions;

  page = 1;
  currency = 'USD';
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

  @Watch('page')
  @Watch('currency') 
  async getTransactionHistory() {
    const page = this.page;
    const currency = this.currency;
    try {
      await this.fetchTransactions({ currency, page, limit: 2 });
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }
  }

  async mounted() {
    try {
      await this.fetchTransactions();
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }
    
  }
}
</script>
