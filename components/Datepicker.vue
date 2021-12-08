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
        :color="color"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :color="color"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="dates"
            range
            :disabled="isDisabled"
            :max="today"
            :color="color"
            :event-color="color"
            :header-color="color"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            :color="color"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            :color="color"
            @click="() => {
                $refs.menu.save(dates.sort((a,b) => new Date(a)-new Date(b)))
                updateDates(dates.sort((a,b) => new Date(a)-new Date(b)))
            }"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>

      
</template>

<script>
import { Vue, Prop } from 'vue-property-decorator'
import Component from 'nuxt-class-component'

import { DateTime } from 'luxon'

@Component({})
export default class DatePicker extends Vue {
  @Prop({type: Array}) stateDates // Массив дат из стейта в формате yyyy-M-dd, то есть 2021-11-16 (такой формат принимает API), например. [начальная дата, конечная дата]
  @Prop({type: Array}) formattedStateDates // Массив отформатированных дат, для визуализации на странице
  @Prop({type: Function}) updateDates // Mutation / Action из стейта для изменения массива дат
  @Prop({type: Boolean, default: false}) isDisabled // Буль, определяет можно ли взаимодействовать с пикером (выбироть даты)ю Можно использовать для отключения пикера во время подгрузки данных
  @Prop({type: String, default: 'primary'}) color;

  dates = []
  menu = false
  today = DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd')

  mounted() {
      this.dates = this.stateDates
  }

  get dateRangeText () {
    return this.formattedStateDates.join(' - ')
  }
}
</script>