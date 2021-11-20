<template>
  <div>
    Welcome to dashboard!

    <chart
      v-if="data.length"
      :dataLabels="getLabels" 
      :dataArray="getData"
      datalabel="Change, %"
      chartTitle="Daily price change in %"
      class="pa-10">
    </chart>  

    <DataTable
      class="pa-10"
      :headers="[
        {text: 'Currency name', sortable: true, value: 'currency', align: 'start'}, 
        {text: 'Current rate, EUR', sortable: true, value: 'rate', align: 'center'}, 
        {text: 'Change, %', sortable: true, value: 'change', align: 'center'},
        {text: 'Favorite', sortable: true, value: 'favorite', align: 'center'}, 
        {text: 'Buy currency', sortable: false, value: 'actions', align: 'center'}, 
      ]"
      :data="dataArray"
      :needSearch="true"
      >
      <BuyBtn
        textOrIcon="mdi-cart-arrow-down"
        :whatToDo="goTrade"
      />
    </DataTable>
  
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

import Chart from '../components/BarChart.vue'
import DataTable from '../components/DataTable.vue'
import BuyBtn from '../components/BuyBtn.vue'


@Component({
  components: {
      Chart,
      DataTable,
      BuyBtn
  },
})

export default class DashboardPage extends Vue{
  dates = ['2021-11-05', '2021-11-16']
  data = []
  labels = []
  lineLab = []
  rawData = []
  dataSorted = []
  loading = true
  pagination = {
    page: 1,
    elements: 10,
    length: 0
  }

  head() {
    return {
      title: 'Dashboard',
    }
  }

  async mounted() {
    await this.callAPI(this.dates)
    this.loading = false
  }

  get getLabels() {
    const result = []
    this.labels.forEach(lab => typeof lab === 'string' && result.push(lab))
    return result
  }
  get getData() {
    return this.data.map(num => Math.round(num * 10000) / 100)
  }

  get listToDisplay() {
    const dataEntries = Object.entries(this.rawData)
    const startEl = this.pagination.page * this.pagination.elements
    const endEl = startEl + this.pagination.elements
    return dataEntries.slice(startEl, endEl)
  }

  get dataArray () {
    return Object.entries(this.rawData).filter(([_, values]) => values.end_rate > 0.01 && values.change > 0.01).map(([name, values]) => ({
      currency: name,
      rate: Math.round(values.end_rate * 10000) / 100,
      change: Math.round(values.change_pct * 10000) / 100,
      favorite: false,
    }))
  }

  goTrade () {
    this.$router.push("/trade")
  }

  async callAPI([start, end]) {
      const data = await this.$axios(`https://api.exchangerate.host/fluctuation?start_date=${start}&end_date=${end}&source=crypto`)
      this.rawData = data.data.rates
      this.pagination.length = Math.ceil((Object.values(this.rawData).length) / 10) - 1

      const dataSorted = Object.entries(data.data.rates).filter(([_, values]) => values.end_rate > 0.01 && values.change > 0.01).sort((a,b) => b[1].change_pct - a[1].change_pct).slice(0,20)

      this.dataSorted = dataSorted
      this.labels = dataSorted.map(arr => arr[0])
      this.data = dataSorted.map(arr => arr[1].change_pct)
      this.loading = false
      console.log(dataSorted)
  }
}
</script>
