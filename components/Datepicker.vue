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
            v-model="formattedStateDates"
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
            :disabled="isDisabled"
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

@Component({})
export default class DatePicker extends Vue {
  @Prop({type: Array}) stateDates // Массив дат из стейта в формате yyyy-M-dd, то есть 2021-11-16 (такой формат принимает API), например. [начальная дата, конечная дата]
  @Prop({type: Array}) formattedStateDates // Массив отформатированных дат, для визуализации на странице
  @Prop({type: Function}) updateDates // Mutation / Action из стейта для изменения массива дат
  @Prop({type: Boolean, default: false}) isDisabled // Буль, определяет можно ли взаимодействовать с пикером (выбироть даты)ю Можно использовать для отключения пикера во время подгрузки данных
  
  dates = []
  menu = false

  mounted() {
      this.dates = this.stateDates
  }
}
</script>