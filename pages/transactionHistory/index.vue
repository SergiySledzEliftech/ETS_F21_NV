<template>
  <div>
    <div>Here will lay chart component </div>
    <v-btn @click="getTransactionHistory">Click me</v-btn>
    <v-data-table
    :headers="headers"
    :items="transactions"
    class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const { State, Action } = namespace('transactionHistory');

@Component({})

export default class DashboardPage extends Vue{
  @State transactions
  @Action fetchTransactions

  headers = [{ text: 'Currency', value: 'currencyName' },
             { text: 'Amount', value: 'amount' },
             { text: 'Date', value: 'date' },]

  head() {
    return {
      title: 'Transaction History',
    }
  }

  async getTransactionHistory() {
    await this.fetchTransactions();
  }


}
</script>
