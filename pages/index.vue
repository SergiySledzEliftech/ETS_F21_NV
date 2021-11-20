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

    <div>
      <v-list>
        <list-item
          v-for="currencyArr in listToDisplay"
          :key="currencyArr[0]"
          :title="currencyArr[0]"
          :rate="1 / currencyArr[1].end_rate"
          :change="currencyArr[1].change_pct"
          :favorite="false"
        ></list-item>
      </v-list>
      <v-pagination
        v-model="pagination.page"
        class="my-4"
        :length="pagination.length"
        :total-visible="6"
      ></v-pagination>
    </div>
  
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

import Chart from '../components/BarChart.vue'

@Component({
  components: {
      Chart,
  },
})

export default class DashboardPage extends Vue{
  dates = ['2021-11-05', '2021-11-16']
  data = []
  labels = []
  lineLab = []
  rawData = []
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
    console.log(this.data.map(num => Math.round(num * 10000) / 100))
    return this.data.map(num => Math.round(num * 10000) / 100)
  }

  get listToDisplay() {
    const dataEntries = Object.entries(this.rawData)
    const startEl = this.pagination.page * this.pagination.elements
    const endEl = startEl + this.pagination.elements
    return dataEntries.slice(startEl, endEl)
  }

  async callAPI([start, end]) {
      const data = await this.$axios(`https://api.exchangerate.host/fluctuation?start_date=${start}&end_date=${end}&source=crypto`)
      this.rawData = data.data.rates
      this.pagination.length = Math.ceil((Object.values(this.rawData).length) / 10) - 1

      const dataSorted = Object.entries(data.data.rates).filter(rate => rate[1].end_rate > 0).sort((a,b) => b[1].change_pct - a[1].change_pct).slice(0,20)

      this.labels = dataSorted.map(arr => arr[0])
      this.data = dataSorted.map(arr => arr[1].change_pct)
      this.loading = false
  }
}
</script>
