<template>
  <div>
    Welcome to dashboard!
    <DatePicker 
      :stateDates="dateRange"
      :formattedStateDates="formatDates"
      :updateDates="updateDateRange"
    />
    <chart
      v-if="fluctData.length"
      :dataLabels="fluctLabels" 
      :dataArray="changesForChart"
      datalabel="Change, %"
      :chartTitle="`Daily price change in % for period ${formatDates[0]} - ${formatDates[1]}`"
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
      :data="dataForTable"
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
import { Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import Chart from '../components/BarChart.vue'
import DataTable from '../components/DataTable.vue'
import BuyBtn from '../components/BuyBtn.vue'
import DatePicker from '../components/Datepicker.vue'

const {State, Mutation, Getter} = namespace('dashboardStore')


@Component({
  components: {
      Chart,
      DataTable,
      BuyBtn,
      DatePicker
  },
})

export default class DashboardPage extends Vue{
  @State dateRange
  @State isLoading
  @State fluctData

  @Getter formatDates
  @Getter fluctLabels
  @Getter changesForChart
  @Getter dataForTable

  @Mutation updateDateRange
  @Mutation changeLoading
  @Mutation updateFluctData

  loading = true

  head() {
    return {
      title: 'Dashboard',
    }
  }

  async mounted() {
    await this.callAPI(this.dateRange)
    this.changeLoading()
    this.unsubscribe = this.$store.subscribe((updateDateRange, _) => {
      return this.callAPI(updateDateRange.payload)
    })
    console.log("dataForTable: ", this.dataForTable)
  }

  unmounted() {
    this.unsubscribe()
  }

  goTrade () {
    this.$router.push("/trade")
  }

  async callAPI([start, end]) {
      const dataCrypto = await this.$axios(`https://api.exchangerate.host/fluctuation?start_date=${start}&end_date=${end}&source=crypto`)
      const dataBank = await this.$axios(`https://api.exchangerate.host/fluctuation?start_date=${start}&end_date=${end}&source=ecb`)
      const data = {...dataCrypto.data.rates, ...dataBank.data.rates}
      
      const dataSorted = Object.entries(data)
        .map(([name, values]) => [name, {...values, start_rate: 1 / values.start_rate, end_rate: 1 / values.end_rate}])
        .filter(([_, values]) => values.end_rate > 0.01 && values.end_rate < 100000)

      this.updateFluctData(dataSorted)

      this.loading = false
  }
}
</script>
