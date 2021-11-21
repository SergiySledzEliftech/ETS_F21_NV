<template>
    <div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
        background-color="primary"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="formattedDates"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="dates"
            range
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="() => {
                $refs.menu.save(dates.sort((a,b) => new Date(a)-new Date(b)))
                updateDateRange(dates.sort((a,b) => new Date(a)-new Date(b)))
            }"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>

      
</template>

<script>
import { Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import { DateTime } from 'luxon'


const {State, Mutation, Getter} = namespace('dashboardStore')

@Component({})
export default class DatePicker extends Vue {
  @State dateRange
  @Getter formatDates
  @Mutation updateDateRange
  
  dates = []
  menu = false

  mounted() {
      this.dates = this.dateRange
  }

  get formattedDates() {
      const [start, end] = this.dateRange
      const startDate = DateTime.fromFormat(start, 'yyyy-M-dd').toFormat('LLL dd yyyy')
      const endDate = DateTime.fromFormat(end, 'yyyy-M-dd').toFormat('LLL dd yyyy')
      return `${startDate} - ${endDate}`
  }
}
</script>

<style>


</style>