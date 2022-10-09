<template>
  <div class="sku-sale-collect-data" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    seriesData: {
      type: Array,
      default: () => []
    },
    xAxisData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // xAxisData: [],
      // seriesData: []
    }
  },
  mounted() {
    // this.getWeekSales()
    var myChart = echarts.init(document.querySelector('.sku-sale-collect-data'))
    const option = {
      title: {
        text: '销售额趋势图',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: '12px'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'solid'
          }
        }
      },
      grid: {
        containLabel: true,
        top: 50,
        bottom: 0,
        left: 10,
        right: 40
      },
      itemGap: 10,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          alignWithLabel: true
        },
        data: this.xAxisData
      },
      yAxis: {
        type: 'value',
        name: '单位：元'
      },
      series: [
        {
          name: '销量',
          data: this.seriesData,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          lineStyle: {
            color: '#ff5757',
            width: '3'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(255,87,87)'

              },
              {
                offset: 1,
                color: 'rgba(255,255,255,0.1)'
              }],
              global: false
            }
          }
        }
      ]
    }
    myChart.setOption(option)
    1
  },
  methods: {
    getWeekSales() {
      var myChart = echarts.init(document.querySelector('.sku-sale-collect-data'))
      const option = {
        title: {
          text: '销售额趋势图',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: '12px'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'solid'
            }
          }
        },
        grid: {
          containLabel: true,
          top: 50,
          bottom: 0,
          left: 30,
          right: 40
        },
        itemGap: 10,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          name: '单位：元'
        },
        series: [
          {
            name: '销量',
            data: this.seriesData,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'white'
              }
            },
            lineStyle: {
              color: '#ff5757',
              width: '3'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255,87,87)'
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)'
                }],
                global: false
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
    .sku-sale-collect-data {
      margin-top: 10px;
      height: 278px;
      // background-color: pink;

    }
</style>
