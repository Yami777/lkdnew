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
</template>

<script>
export default {
  props: {
    month: {
      type: Object,
      default: () => ({})
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
