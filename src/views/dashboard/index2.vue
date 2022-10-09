<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="grid-content sku-sale-data">
            <el-row>
              <!-- 工单统计区域 -->
              <el-col :span="13">
                <div class="grid-content home-user-task-stats">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <span>工单统计</span>
                    <span class="home-data-time">2022.09.01~2022.09.28</span>
                  </div>
                  <!-- 内容区域 -->
                  <el-row class="home-user-task-stats-msg">
                    <el-col :span="6" class="home-task-stats-item">
                      <span class="task-stats-data">150</span>
                      <span class="home-task-stats-text">工单总数（个）</span>
                    </el-col>
                    <el-col :span="6" class="home-task-stats-item">
                      <span class="task-stats-data">0</span>
                      <span class="home-task-stats-text">完成工单（个）</span>
                    </el-col>
                    <el-col :span="6" class="home-task-stats-item">
                      <span class="task-stats-data">0</span>
                      <span class="home-task-stats-text">进行工单（个）</span>
                    </el-col>
                    <el-col :span="6" class="home-task-stats-item">
                      <span class="task-stats-data">150</span>
                      <span class="home-task-stats-text">取消工单（个）</span>
                    </el-col>
                  </el-row>
                </div>
                <!-- <task-stats class="grid-content home-user-task-stats" /> -->
              </el-col>

              <!-- 销售统计区域 -->
              <el-col :span="11">
                <div class="grid-content home-sku-sale-stats">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <span>销售统计</span>
                    <span class="home-data-time">2022.09.01~2022.09.28</span>
                  </div>
                  <!-- 内容区域 -->
                  <el-row class="home-user-task-stats-msg">

                    <el-col :span="12" class="home-task-stats-item">
                      <span class="task-stats-data">13504</span>
                      <span class="home-task-stats-text">订单量（个）</span>
                    </el-col>
                    <el-col :span="12" class="home-task-stats-item">
                      <span class="task-stats-data">8.81</span>
                      <span class="home-task-stats-text">销售额（万元）</span>
                    </el-col>

                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <!-- 销售数据区域 -->
              <el-col :span="24">
                <div class="grid-content sku-sale-collect">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <span>销售数据</span>
                    <span class="home-data-time">2022.09.01~2022.09.28</span>
                  </div>
                  <!-- 内容区域 -->
                  <el-row>
                    <!--销售数据区域 -->
                    <el-col :span="12">
                      <div class="sku-sale-collect-data" />
                    </el-col>
                    <!-- 销售额分布区域 -->
                    <el-col :span="12"><div class="sku-sale-collect-sales">销售额</div></el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-col>
        <!-- 商品排行榜 -->
        <el-col :span="6">
          <div class="grid-content  sku-sale-rank">
            <!-- 标题区域 -->
            <div class="home-title">
              <span>   商品热榜</span>
              <span class="home-data-time">2022.09.01~2022.09.28</span>
            </div>

          </div>
        </el-col>
      </el-row>
      <!-- 合作商和监控区域 -->
      <el-row>
        <!-- 合作商点位数 -->
        <el-col :span="12"><div class="grid-content partner-node-collect">
          <!-- 标题区域 -->
          <div class="home-title">
            <span>合作商点位数TOP5</span>
          </div>
        </div>
        </el-col>
        <!-- 异常设备监控区域 -->
        <el-col :span="12">
          <div class="grid-content abnormal-equipment">
            <!-- <img src="@/assets/common/empty.png" alt=""> -->
            <!-- 标题区域 -->
            <div class="home-title">
              <span>异常设备监控</span>
            </div>
            <!-- 内容区域 -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
import { getAllTaskStatusAPI } from '@/api/task'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      week: {
        start_time: ''
      }
    }
  },
  mounted() {
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
        trigger: 'axis'
      },
      grid: {
        containLabel: true,
        top: 50,
        bottom: 0,
        left: 20,
        right: 30
      },
      itemGap: 10,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          alignWithLabel: true
        },
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      },
      yAxis: {
        type: 'value',
        name: '单位：元'
      },
      series: [
        {
          name: '销量',
          data: [5500, 3000, 4700, 0, 0, 0, 0],
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
  },
  created() {
    this.getAllTaskStatus()
  },
  methods: {
    async getAllTaskStatus() {
      await getAllTaskStatusAPI()
      // console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #f8fafd;

  &-container {
    margin: 30px;
  }
  &-text {
    // font-size: 30px;
    // line-height: 46px;
  }
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 20px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 20px;
    // padding: 10px;
    height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  // 公共标题区域‘
  .home-title {
    font-size: 16px;
    line-height: 1.15;
    font-weight: 700;
  }
  .home-data-time {
    margin-left: 10px;
    font-weight: 400;
    color: #999;
    font-size: 12px;
  }
    .home-user-task-stats-msg{
    display: flex;
    align-items: center;
    height: 108px;
    .home-task-stats-item {
      padding: 20px;
      display: flex;
      flex-direction: column;
       height: 100%;
       .task-stats-data {
        font-size: 36px;
        font-weight: 700;
       }
       .home-task-stats-text {
        margin-top: 10px;
        font-size: 12px;
       }
        }
      }
  // 商品热榜区域
  .sku-sale-rank {
    padding: 10px;
    background-color: pink;
    height: 540px;
  }
  // 左侧区域
  .sku-sale-data {
    // background-color: aquamarine;
     height: 540px;
    //  工单统计区域
     .home-user-task-stats {
      padding: 20px;
      height: 166px;
      margin-right: 20px;
      background: #e9f3ff;
      background-image: url('~@/assets/common/circle.png'), url('~@/assets/common/task.png');
      background-repeat: no-repeat no-repeat ;
      background-position: 0 0,calc(100% - 12px) 100%;
       .task-stats-data {
        color: #072074;
       }
      .home-task-stats-text {
        color: #91a7dc;
       }

     }
    //  销售统计区域
     .home-sku-sale-stats {
      padding: 20px;
         background:  #fbefe8 url('~@/assets/common/pinkpig.png') no-repeat calc(100% - 12px) 100%;
         height: 166px;
          .home-task-stats-item {
       padding-left: 70px;
          }
    .task-stats-data {
      color: #ff5757;
      text-shadow: 2px 4px 7px rgb(255 99 85 / 50%)
      }
        .home-task-stats-text {
        color: #de9690;
       }
     }
    //  销售数据区域
       .sku-sale-collect {
        padding: 20px;
       background-color: #fff;
       height: 352px;
    .sku-sale-collect-data {
      margin-top: 10px;
      height: 278px;
      // background-color: pink;
    }
     .sku-sale-collect-sales {
        margin-top: 10px;
      height: 278px;
      background-color: red;
    }
  }
  }
  // 合作商点位区域
  .partner-node-collect {
    padding: 20px;
    margin-right: 10px;
    height: 353px;
    background-color: #fff;
  }
  // 监控区域
.abnormal-equipment {
    padding: 20px;
    margin-left: 10px;
    height: 353px;

    background: url('~@/assets/common/empty.png') no-repeat center;
      background-color: #fff;
}
</style>
