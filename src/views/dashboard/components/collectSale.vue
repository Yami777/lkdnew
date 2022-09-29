<template>
  <div class="sku-sale-collect-sales" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(document.querySelector('.sku-sale-collect-sales'))
    const option = {
      title: {
        text: '销售额分布',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: '12px'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        }
      },
      legend: {
        data: ['销量']
      },
      xAxis: {
        type: 'category',
        data: ['北京平', '霍营街']
      },
      yAxis: {
        type: 'value',
        name: '单位：元'
      },
      grid: {
        // top: 0,
        left: 50,
        right: 0,
        bottom: 20
      },
      series: [
        {
          data: [7200, 2000],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              barBorderRadius: [4, 4, 0, 0]
            }
          },

          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(151, 180, 255)'
            },
            {
              offset: 1,
              color: 'rgba(173, 195, 249)'
            }],
            global: false }
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style>
  .sku-sale-collect-sales {
   margin-top: 10px;
  height: 278px;
    }
</style>
