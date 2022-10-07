<template>
  <div>
    <!-- 标题区域 -->
    <div class="home-title">
      <span>销售统计</span>
      <span class="home-data-time">{{ month.start_time }}~{{ month.end_time }}</span>
    </div>
    <!-- 内容区域 -->
    <el-row class="home-user-task-stats-msg">

      <el-col :span="12" class="home-task-stats-item">
        <span class="task-stats-data">{{ orderCount }}</span>
        <span class="home-task-stats-text">订单量（个）</span>
      </el-col>
      <el-col :span="12" class="home-task-stats-item">
        <span class="task-stats-data">{{ monthSales }}</span>
        <span class="home-task-stats-text">销售额（万元）</span>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getMonthSalesAPI, getPartnerORderAPI } from '@/api/report'
export default {
  props: {
    month: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      partner: {
        partnerId: '',
        start: `${dayjs().startOf('month').format('YYYY-MM-DD')} 00:00:00`,
        end: `${dayjs(new Date()).format('YYYY-MM-DD')} 23:59:59`,
        innerCode: ''
      },
      monthSales: 0,
      orderCount: 0
    }
  },
  created() {
    this.getMonthSales()
    this.getPartnerORder()
  },
  methods: {
    // 获取每个月的销售额
    async  getMonthSales() {
      try {
        const { data } = await getMonthSalesAPI(this.partner)
        // console.log(data)
        this.monthSales = data === 0 ? 0 : (data / 1000000).toFixed(2)
      } catch (e) {
        throw new Error()
      }
    },
    // 获取每个月的订单量
    async getPartnerORder() {
      try {
        const { data } = await getPartnerORderAPI(this.partner)
        // console.log(data)
        this.orderCount = data
      } catch (e) {
        throw new Error()
      }
    }
  }
}
</script>

<style>

       .home-task-stats-text {
        margin-top: 10px;
        font-size: 12px;
       }
    .task-stats-data {
      color: #ff5757;
      text-shadow: 2px 4px 7px rgb(255 99 85 / 50%)
      }
      .home-task-stats-text {
        color: #de9690;
       }
       .home-task-stats-item {
       padding-left: 70px;
          }
</style>
