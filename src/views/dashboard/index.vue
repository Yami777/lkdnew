<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="grid-content sku-sale-data">
            <el-row>
              <!-- 工单统计区域 -->
              <el-col :span="13">
                <!-- 工单统计区域 -->
                <div class="grid-content home-user-task-stats">
                  <task-states :month="month" />
                </div>
              </el-col>
              <!-- 销售统计区域 -->
              <el-col :span="11">
                <div class="grid-content home-sku-sale-stats">
                  <sale-states
                    :month="month"
                  />
                </div>
              </el-col>
            </el-row>
            <el-row>
              <!-- 销售数据区域 -->
              <el-col :span="24">
                <div class="grid-content sku-sale-collect">
                  <!-- 标题区域 -->
                  <div class="home-title">
                    <div>
                      <span>销售数据</span>
                      <span class="home-data-time">{{ month.start_time }}~{{ month.end_time }}</span>
                    </div>
                    <div class="week-month-year">
                      <div :class="['week-month-year-item',{isChecked:active===0}]" @click="showWeek">周</div>
                      <div :class="['week-month-year-item',{isChecked:active===1}]" @click="showMonth">月</div>
                      <div :class="['week-month-year-item',{isChecked:active===2}]" @click="showYear">年</div>
                    </div>
                  </div>
                  <!-- 内容区域 -->
                  <el-row>
                    <!--销售数据区域 -->
                    <el-col :span="12">
                      <div>
                        <collect-data v-if="xAxisData.length!==0" :x-axis-data="xAxisData" :series-data="seriesData" />
                      </div>
                    </el-col>
                    <!-- 销售额分布区域 -->
                    <el-col :span="12">
                      <div>
                        <collect-sale v-if="partnerSeries.length!==0" :partner-x-axis="partnerXAxis" :partner-series="partnerSeries" />
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-col>
        <!-- 商品排行榜 -->
        <el-col :span="6">
          <div class="grid-content  sku-sale-rank">

            <sale-rank :month="month" />
          </div>
        </el-col>
      </el-row>
      <!-- 合作商和监控区域 -->
      <el-row>
        <!-- 合作商点位数 -->
        <el-col :span="12">
          <div class="grid-content partner-node-collect">
            <partner-node />
          </div>
        </el-col>
        <!-- 异常设备监控区域 -->
        <el-col :span="12">
          <div class="grid-content abnormal-equipment">
            <abnormal />

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import TaskStates from './components/taskStats.vue'
import SaleStates from './components/saleStates.vue'
import CollectData from './components/collectData.vue'
import CollectSale from './components/collectSale.vue'
import SaleRank from './components/saleRank.vue'
import PartnerNode from './components/partnerNode.vue'
import Abnormal from './components/abnormal.vue'
import { getSeriesSaleDataAPI, getAreaPartnerSalesAPI } from '@/api/report'
export default {
  name: 'Dashboard',
  components: {
    TaskStates,
    SaleStates,
    CollectData,
    CollectSale,
    SaleRank,
    PartnerNode,
    Abnormal
  },
  data() {
    return {
      month: {
        start_time: dayjs().startOf('month').format('YYYY-MM-DD').replace(/-/ig, '.'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD').replace(/-/ig, '.')
      },
      partner: {
        partnerId: '',
        start: `${dayjs().startOf('month').format('YYYY-MM-DD')} 00:00:00`,
        end: `${dayjs(new Date()).format('YYYY-MM-DD')} 23:59:59`,
        innerCode: ''
      },
      daySeries: {
        collectType: 1, // 1、按日，2、按月
        start: dayjs().startOf('month').format('YYYY-MM-DD'),
        end: dayjs(new Date()).format('YYYY-MM-DD')
      },
      xAxisData: [],
      seriesData: [],
      xAxis: [],
      newArr: [],
      areaPatSales: {
        start_day: '',
        end_day: ''
      },
      partnerSeries: [],
      partnerXAxis: [],
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // console.log(this.month)
  },
  created() {
    this.showWeek()
  },
  methods: {
    showWeek() {
      this.active = 0
      this.showWeekData()
      this.showWeekPartner()
    },
    showMonth() {
      this.active = 1
      this.showMonthData()
      this.showMonthPartner()
    },
    showYear() {
      this.active = 2
      this.showYearData()
      this.showYearPartner()
    },

    async showWeekData() {
      this.xAxisData = []
      this.seriesData = []
      this.isChecked = true
      try {
        const { data } = await getSeriesSaleDataAPI(this.daySeries.collectType, this.daySeries.start, this.daySeries.end)
        // console.log(data)
        // data.xAxis.forEach(ele => this.xAxis.push(ele))
        // console.log(this.xAxis)

        const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        const num = ((new Date()).getDay() || 7) - 1
        this.xAxisData = week.filter((item, index) => {
          return index <= num
        })

        const res = data.series
        this.seriesData = res.reverse().filter((item, index) => index <= num).reverse()
      // console.log(this.seriesData)
      } catch {
        throw new Error()
      }
    },
    async   showMonthData() {
      this.xAxisData = []
      this.seriesData = []
      try {
        const { data } = await getSeriesSaleDataAPI(this.daySeries.collectType, this.daySeries.start, this.daySeries.end)
        // console.log(data)
        const arr = JSON.parse(JSON.stringify(data.xAxis))
        const newr = []
        // console.log(this.xAxis[0].dayjs.format('MM-DD'))
        arr.forEach(ele => newr.push(ele))
        this.xAxisData = newr.map(item => {
          return item.slice(5).replace(/(\d{2})\-(\d{2})/, `$1月$2日`).replace(/\b(0)/, '')
        })
        // console.log(this.xAxisData)
        this.seriesData = data.series
      } catch {
        throw new Error()
      }
    },
    async  showYearData() {
      this.daySeries.collectType = 2
      this.xAxisData = []
      this.seriesData = []
      const { data } = await getSeriesSaleDataAPI(this.daySeries.collectType, `${(new Date()).getFullYear()}-01-01`, this.daySeries.end)
      const res = JSON.parse(JSON.stringify(data.xAxis))
      this.xAxisData = res.map(month => month.replace(/(\d{4})\-(\d{2})/, `$1年$2月`))
      this.seriesData = data.series
    },
    async showWeekPartner() {
      this.partnerSeries = []
      this.partnerXAxis = []
      const date = new Date()
      const day = date.getDay() || 7
      // console.log(dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)).format('YYYY-MM-DD'))
      this.areaPatSales.start_day = dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)).format('YYYY-MM-DD')
      // console.log(this.areaPatSales.start_day)
      try {
        const { data } = await getAreaPartnerSalesAPI(this.areaPatSales.start_day, dayjs(new Date()).format('YYYY-MM-DD'))
        // console.log(data)
        this.partnerXAxis = data.xAxis
        this.partnerSeries = data.series
      } catch {
        throw new Error()
      }
    },
    async showMonthPartner() {
      this.partnerSeries = []
      this.partnerXAxis = []
      try {
        const { data } = await getAreaPartnerSalesAPI(dayjs().startOf('month').format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD'))
        // console.log(data)
        this.partnerXAxis = data.xAxis
        this.partnerSeries = data.series
      } catch {
        throw new Error()
      }
    },
    async showYearPartner() {
      this.partnerSeries = []
      this.partnerXAxis = []
      try {
        const { data } = await getAreaPartnerSalesAPI(`${(new Date()).getFullYear()}-01-01`, dayjs(new Date()).format('YYYY-MM-DD'))
        // console.log(data)
        this.partnerXAxis = data.xAxis
        this.partnerSeries = data.series
      } catch {
        throw new Error()
      }
    }

  }
}
</script>

<style>
  /* 公共标题区域 */
  .home-title {
    display: flex;
    font-size: 16px;
    align-items: center;
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
    height: 108px;}
  .home-task-stats-item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;}
  .task-stats-data {
    font-size: 36px;
    font-weight: 700;
  }
</style>
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

  // 商品热榜区域
  .sku-sale-rank {
    padding: 10px;
    background-color: #fff;
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
     }
    //  销售统计区域
     .home-sku-sale-stats {
      padding: 20px;
      background:  #fbefe8 url('~@/assets/common/pinkpig.png') no-repeat calc(100% - 12px) 100%;
      height: 166px;
     }
    //  销售数据区域
       .sku-sale-collect {
        padding: 20px;
       background-color: #fff;
       height: 352px;

       .home-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 34px;
        .week-month-year {
          display: flex;
          text-align: center;
          font-weight: 600;
          color: #333;
          display: -webkit-box;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 129px;
        height: 34px;
        background: rgba(233,243,255,.37);
        border-radius: 10px;
    .week-month-year-item {
        width: 37px;
        height: 25px;
        font-size: 14px;
        line-height: 25px;
        cursor: pointer;
    }
    .isChecked {
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      text-align: center;
      font-weight: 600;
      color: #333;
    }
        }
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

      ::v-deep .el-table::before{
 background-color: transparent;
}
::v-deep .el-table td{
border-bottom: none;
height: 44px !important;
padding: 0px !important;
}
::v-deep .el-table tbody tr:hover>td { border-radius: 5px;}
::v-deep .el-table th.is-leaf {
 border-bottom: none;
height: 44px;

}
</style>
