<template>
  <div>
    Welcome to dashboard!
    <DatePicker
      :isDisabled="loading"
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
      height="400px"
      :headers="[
        {text: 'Currency name', sortable: true, value: 'currency', align: 'start', width: '50%'}, 
        {text: 'Current rate, EUR', sortable: true, value: 'rate', align: 'center', width: '15%'}, 
        {text: 'Change, %', sortable: true, value: 'change', align: 'center', width: '15%'},
        {text: 'Favorite', sortable: true, value: 'favorite', align: 'center', width: '10%'}, 
        {text: '', sortable: false, value: 'actions', align: 'center', width: '10%'}, 
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

import { serverUrl } from '../utils/config'

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

  @Getter dates
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
    this.unsubscribe = this.$store.watch(this.dates, () => this.callAPI(this.dateRange))
  }

  unmounted() {
    this.unsubscribe()
  }

  goTrade () {
    this.$router.push("/trade")
  }

  async callAPI([start, end]) {
      this.loading = true
      const dataSorted = await this.$axios(`${serverUrl}/globalCurrencies/changes?start_date=${start}&end_date=${end}&source=crypto`)
      this.updateFluctData(dataSorted.data)

      this.loading = false
  }
}
</script>
