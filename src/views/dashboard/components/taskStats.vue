<template>
  <div>
    <!-- 标题区域 -->
    <div class="home-title">
      <span>工单统计</span>
      <span class="home-data-time">{{ month.start_time }}~{{ month.end_time }}</span>
    </div>
    <!-- 内容区域 -->
    <el-row class="home-user-task-stats-msg">
      <el-col :span="6" class="home-task-stats-item">
        <span class="task-stats-data">{{ monthTaskTotal }}</span>
        <span class="home-task-stats-text">工单总数（个）</span>
      </el-col>
      <el-col :span="6" class="home-task-stats-item">
        <span class="task-stats-data">{{ completedTotal }}</span>
        <span class="home-task-stats-text">完成工单（个）</span>
      </el-col>
      <el-col :span="6" class="home-task-stats-item">
        <span class="task-stats-data">{{ progressTotal }}</span>
        <span class="home-task-stats-text">进行工单（个）</span>
      </el-col>
      <el-col :span="6" class="home-task-stats-item">
        <span class="task-stats-data">{{ monthCancelTotal }}</span>
        <span class="home-task-stats-text">取消工单（个）</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getTaskStatusAPI } from '@/api/task'
export default {
  props: {
    month: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      taskMsg: {
        start: `${dayjs().startOf('month').format('YYYY-MM-DD')} 00:00:00`,
        end: `${dayjs().endOf('month').format('YYYY-MM-DD')} 23:59:59`
      },
      monthTaskTotal: 0,
      monthCancelTotal: 0, // 取消工单
      completedTotal: 0, // 完成工单
      progressTotal: 0 // 进行中总数
    }
  },
  created() {
    this.getTaskStatus()
  },
  methods: {
    async getTaskStatus() {
      const { data } = await getTaskStatusAPI(this.taskMsg.start, this.taskMsg.end)
      // console.log(data)
      this.monthTaskTotal = data.reduce((acc, item) => {
        acc += item.total
        return acc
      }, 0)
      this.monthCancelTotal = data.reduce((acc, item) => {
        acc += item.cancelTotal
        return acc
      }, 0)
      this.completedTotal = data.reduce((acc, item) => {
        acc += item.completedTotal
        return acc
      }, 0)
      this.progressTotal = data.reduce((acc, item) => {
        acc += item.progressTotal
        return acc
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
      .task-stats-data {
        color: #072074;
       }
      .home-task-stats-text {
        color: #91a7dc;
       }

</style>
