<template>
  <div>
    <!-- 标题区域 -->
    <div class="home-title">
      <span>   商品热榜</span>
      <span class="home-data-time">{{ month.start_time }}~{{ month.end_time }}</span>
    </div>
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

</style>
