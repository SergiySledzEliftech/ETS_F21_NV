<template>
  <div>
    <div>Here will lay chart component </div>
    <v-row align="center">
      <v-col class="d-flex" cols="6" sm="6">
        <v-select class="my-6" :items="currencies" v-model="currency" label="Select currency!" dense></v-select>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="transactions" class="elevation-1" hide-default-footer></v-data-table>
    <v-pagination v-model="page" :length="6" @input="next"></v-pagination>
  </div>
</template>

<script>
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'

const { State, Action } = namespace('transactionHistory');

@Component({})

export default class DashboardPage extends Vue{
  @State transactions
  @Action fetchTransactions

  page = 1
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

  onSelectCurrency(e) {
    console.log(e);
  }

  @Watch('page')
  @Watch('currency') 
  async getTransactionHistory() {
    const page = this.page;
    const currency = this.currency;
    await this.fetchTransactions({ currency, page, limit: 2 });
  }

  async mounted() {
    await this.fetchTransactions();
  }


}
</script>
