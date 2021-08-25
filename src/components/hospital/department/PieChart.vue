<script>
import { Pie } from "vue-chartjs";

export default {

  props: {
    chartData: {
      type: Object,
      required: true
    },

    options: {
      type: Object,
      required: true
    }
  },

  extends: Pie,
  
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>