<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { Bar } from 'vue-chartjs'

import getRandomColors from '../utils/getRandomColors';

@Component({
  extends: Bar,
  props: {
      dataLabels: {
          type: Array // Массив данных для оси координат Х, вида ['точка1', 'точка2', ...]. Сюда закидывать массив дат.
      },
      dataArray: {
          type: Array // Массив с данными для построение графика, вида [8,10,15, *остальные точки по оси Y*. Сюда закидывать массив значений для графика.
      }, 
      datalabel: {
          type: String // Массив данных для подписей линий графика, вида ['подпись1', 'подпись2', ...]. Сюда закидывать названия валют.
      }
  },
})
export default class Chart extends Vue {
  // Объект настроек для графика. В данном случае график будет менять размер при изменении размеров окна с сохранением пропорций,
  // отключена легенда и добавлены надписи внутри баров со значениями.
  options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
        //   display: false
        },
        tooltips: {
            enabled: true
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = "rgba(111, 108, 153, 1)";
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    console.log(bar)
                    let maxData = bar._yScale._endValue

                    let data = `${dataset.data[index]}%`;
                    let yPosition = bar._model.y - 5

                    if (maxData - dataset.data[index] <= 5){
                      yPosition = bar._model.y + 25
                    }

                    ctx.fillText(data, bar._model.x, yPosition);
                });
            });
          }
        }
      }

  mounted () {
    const colors = getRandomColors(this.dataLabels.length, 0.25); // ставим рандомные цвета каждому бару
    
    this.renderChart({
      labels: this.dataLabels,
      datasets: [{
        data: this.dataArray,
        label: this.datalabel,
        backgroundColor: colors
      }]},
      this.options
    )}
}
</script>