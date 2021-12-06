<script>
import { Prop, Vue, Watch } from 'vue-property-decorator'
import Component from 'nuxt-class-component'
import { Doughnut } from 'vue-chartjs'

import getRandomColors from '../utils/getRandomColors';

@Component({extends: Doughnut})
export default class Chart extends Vue {
  @Prop({type: Array, required: true}) dataLabels // Массив данных для оси координат Х, вида ['точка1', 'точка2', ...]. Сюда закидывать массив дат.
  @Prop({type: Array, required: true}) dataArray // Массив с данными для построение графика, вида [8,10,15, *остальные точки по оси Y*. Сюда закидывать массив значений для графика.
  @Prop({type: String, required: true}) datalabel // Массив данных для подписей линий графика, вида ['подпись1', 'подпись2', ...]. Сюда закидывать названия валют.
  @Prop({type: String}) chartTitle // Название графика.

  // Объект настроек для графика. В данном случае график будет менять размер при изменении размеров окна с сохранением пропорций,
  // отключена легенда и добавлены надписи внутри баров со значениями.
  options = {
    responsive: true,
    clip: 0,
    title: {
      display: false,
      text: ""
    },
    animation: {
      duration: 1000,
      onComplete: function () {
        const chartInstance = this.chart
        const ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
      }
    }
  }
  mounted () {
    this.updateChart();
  }

  @Watch('dataLabels', {deep: true})
  @Watch('dataArray', {deep: true})
  @Watch('datalabel', {deep: true})
  updateChart() {
    const colors = getRandomColors(this.dataLabels.length, 0.25); // ставим рандомные цвета каждому бару
    
    if (this.chartTitle) {
      this.options.title.display = true
      this.options.title.text = this.chartTitle
    }

    this.renderChart({
      labels: this.dataLabels,
      datasets: [{
        data: this.dataArray,
        label: this.datalabel,
        backgroundColor: colors,
      }]},
      this.options
    )
  }
}
</script>