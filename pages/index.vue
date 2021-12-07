<template>
  <v-col>
    <DatePicker
      :isDisabled="loading"
      :stateDates="dateRange"
      :formattedStateDates="formatDates"
      :updateDates="updateDateRange"
      style="width: 222px"
      class="mx-auto"
      color="rgba(190, 43, 141, 0.6)"
    />
    <v-row class="pb-10 d-flex align-center">
      <v-col xs="12" sm="12" lg="8">
        <BarChart
          v-if="fluctData.length"
          :dataLabels="fluctLabels" 
          :dataArray="changesForChart"
          datalabel="Change, %"
          :chartTitle="`Daily price change in % for period ${formatDates[0]} - ${formatDates[1]}`"
          class="ma-0 pl-3"
        />  
      </v-col>
      <v-col xs="12" sm="12" md="5" lg="4" class="d-flex justify-center order-md-last order-lg-0">
          <PieChart
            v-if="fluctData.length"
            :dataLabels="['USD', 'BTC', 'ETHER', 'UAH', 'CAD', 'DIR']" 
            :dataArray="[154, 125, 95, 21, 15, 10]"
            datalabel="Operations"
            :chartTitle="`Operations with currencies for period ${formatDates[0]} - ${formatDates[1]}`"
            width="320px"
          />
      </v-col>
      <v-col xs="12" sm="12" md="7" lg="12">
        <DataTable
          class="px-5"
          height="410px"
          :headers="[
            {text: 'Currency name', sortable: true, value: 'currency', align: 'start', width: '50%'}, 
            {text: 'Current rate, EUR', sortable: true, value: 'rate', align: 'center', width: '15%'}, 
            {text: 'Change, %', sortable: true, value: 'change', align: 'center', width: '15%'},
            {text: 'Favorite', sortable: true, value: 'favorite', align: 'center', width: '10%'}, 
            {text: '', sortable: false, value: 'actions', align: 'center', width: '10%'},
          ]"
          :data="dataForTable"
          :needSearch="true"
          color="rgba(190, 43, 141, 0.6)"
          >
          <BuyBtn
            textOrIcon="mdi-cart-arrow-down"
            :whatToDo="goTrade"
          />
        </DataTable>
      </v-col>
    </v-row>  
  </v-col>
</template>

<script>
import { Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import BarChart from '../components/HorizontalBarChart.vue'
import PieChart from '../components/PieChart.vue'
import DataTable from '../components/DataTable.vue'
import BuyBtn from '../components/BuyBtn.vue'
import DatePicker from '../components/Datepicker.vue'

import { serverUrl } from '../utils/config'
import headMixin from '~/helpers/mixins/headMixin'

const {State, Mutation, Getter} = namespace('dashboardStore')


@Component({
  components: {
      BarChart,
      PieChart,
      DataTable,
      BuyBtn,
      DatePicker
  },
  mixins: [headMixin]
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
  title="Dashboard"

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
      const dataSorted = await this.$axios(`${serverUrl}/globalCurrencies/changes?`, {
        params: {
          start_date: start,
          end_date: end
        }
      })
      this.updateFluctData(dataSorted.data)

      this.loading = false
  }
}
</script>
<style>
canvas{
    margin: 0;
    }
</style>