<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { Line } from 'vue-chartjs'

import getRandomColors from '../utils/getRandomColors'

@Component({
  extends: Line,
  props: {
      dataLabels: {
          type: Array // Массив данных для оси координат Х, вида ['точка1', 'точка2', ...]. Сюда закидывать массив дат.
      },
      dataArray: {
          type: Array // Массив с массивами данных для построение графика, вида [[8,10,15, *остальные точки по оси Y*], [14,9,25, *остальные точки по оси Y*], ...]. Сюда закидывать массив значений для графика.
      }, 
      lineLabels: {
          type: Array // Массив данных для подписей линий графика, вида ['подпись1', 'подпись2', ...]. Сюда закидывать названия валют.
      }
  },
})
export default class Chart extends Vue {
    // Объект настроек для графика. В данном случае график будет менять размер при изменении размеров окна с сохранением пропорций
  options = {
    responsive: true,
    maintainAspectRatio: false,
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
    const data = this.composeData()

    this.renderChart(data, this.options)
  }
}
</script>