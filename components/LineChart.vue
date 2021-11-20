<script>
import { Prop, Vue, Watch } from 'vue-property-decorator'
import Component from 'nuxt-class-component'
import { Line } from 'vue-chartjs'

import getRandomColors from '../utils/getRandomColors'

@Component({extends: Line})
export default class Chart extends Vue {
  @Prop({type: Array, required: true}) dataLabels // Массив данных для оси координат Х, вида ['точка1', 'точка2', ...]. Сюда закидывать массив дат.
  @Prop({type: Array, required: true}) dataArray // Массив с данными для построение графика, вида [8,10,15, *остальные точки по оси Y*. Сюда закидывать массив значений для графика.
  @Prop({type: Array, required: true}) lineLabels // Массив данных для подписей линий графика, вида ['подпись1', 'подпись2', ...]. Сюда закидывать названия валют.
  @Prop({type: String}) chartTitle // Название графика.

  // Объект настроек для графика. В данном случае график будет менять размер при изменении размеров окна с сохранением пропорций
  options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
          display: false,
      },
  }

  composeData() {
    const {options, dataLabels, lineLabels, dataArray} = this
    const colors = getRandomColors(lineLabels.length, 1)

    const datasets = []
    lineLabels.forEach((label, index) => {
    typeof label === 'string' && datasets.push({
            label: label,
            borderColor: colors[index],
            data: dataArray[index],
            fill: false
        })
    })
    return {labels: dataLabels, datasets: datasets, options: options}
  }

  mounted () {
    this.updateChart()
  }

  @Watch('dataLabels', {deep: true})
  @Watch('dataArray', {deep: true})
  @Watch('lineLabels', {deep: true})
  updateChart() {
    const data = this.composeData()
    
    if (this.chartTitle) {
      this.options.title.display = true
      this.options.title.text = this.chartTitle
    }

    this.renderChart(data, this.options)
  }
}
</script>