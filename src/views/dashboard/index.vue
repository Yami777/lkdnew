<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="grid-content sku-sale-data">
            <el-row>
              <!-- 工单统计区域 -->
              <el-col :span="15">
                <div class="grid-content home-user-task-stats">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <span>   工单统计</span>
                    <span class="home-data-time">2022.09.01~2022.09.28</span>
                  </div>

                </div>
              </el-col>

              <!-- 销售统计区域 -->
              <el-col :span="9"><div class="grid-content home-sku-sale-stats">
                <!-- 标题区域 -->
                <div class="home-title">
                  <span>   销售统计</span>
                  <span class="home-data-time">2022.09.01~2022.09.28</span>
                </div>

              </div>
              </el-col>
            </el-row>
            <el-row>
              <!-- 销售数据区域 -->
              <el-col :span="24">
                <div class="grid-content sku-sale-collect">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <span>   销售数据</span>
                    <span class="home-data-time">2022.09.01~2022.09.28</span>
                  </div>
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
            <!-- 标题区域 -->
            <div class="home-title">
              <span>异常设备监控</span>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    var myChart = echarts.init(document.querySelector('.home-user-task-stats'))
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {

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
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  // 公共标题区域‘
  .home-title {
    font-size: 16px;
    font-weight: 700;
  }
  .home-data-time {
    margin-left: 10px;
    font-weight: 400;
    color: #999;
    font-size: 12px;
  }
  // 商品热榜区域
  .sku-sale-rank {
    padding: 10px;
    background-color: pink;
    min-height: 540px;
  }
  // 左侧区域
  .sku-sale-data {
    // background-color: aquamarine;
     min-height: 540px;
    //  工单统计区域
     .home-user-task-stats {

      padding: 20px;
      min-height: 166px;
      margin-right: 20px;
      background: #e9f3ff;
      background-image: url('~@/assets/common/circle.png'), url('~@/assets/common/task.png');
      background-repeat: no-repeat no-repeat ;
      background-position: 0 0,calc(100% - 12px) 100%
     }
    //  销售统计区域
     .home-sku-sale-stats {
      padding: 20px;
         background:  #fbefe8 url('~@/assets/common/pinkpig.png') no-repeat calc(100% - 12px) 100%;
         min-height: 166px;
     }
    //  销售数据区域
       .sku-sale-collect {
        padding: 20px;
    background-color: #fff;
    min-height: 352px;
  }
  }
  // 合作商点位区域
  .partner-node-collect {
    padding: 20px;
    margin-right: 10px;
    min-height: 353px;
    background-color: #fff;
  }
  // 监控区域
.abnormal-equipment {
   padding: 20px;
  margin-left: 10px;
 min-height: 353px;
    background-color: aquamarine;
}
</style>
