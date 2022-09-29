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
        <span class="task-stats-data">13504</span>
        <span class="home-task-stats-text">订单量（个）</span>
      </el-col>
      <el-col :span="12" class="home-task-stats-item">
        <span class="task-stats-data">8.81</span>
        <span class="home-task-stats-text">销售额（万元）</span>
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
