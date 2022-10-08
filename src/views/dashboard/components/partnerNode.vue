<template>
  <div class="partner-node">
    <!-- 标题区域 -->
    <div class="home-title">
      <span>合作商点位数TOP5</span>
      <i class="el-icon-chat-dot-round" />
    </div>
    <el-row class="partner-node-content">
      <el-col :span="17"><div class="partner-node-content-bar" /></el-col>
      <el-col :span="7"><div class="partner-node-content-text">
        <div class="count">16</div>
        <div class="name">点位数</div>
        <div class="count count2">5</div>
        <div class="name">合作商数</div>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(document.querySelector('.partner-node-content-bar'))
    const option = {
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 80],
          center: ['40%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 32, name: '佳佳' },
            { value: 40, name: '金燕龙合作商' },
            { value: 30, name: 'likede4' },
            { value: 18, name: '北京合作商' },
            { value: 18, name: '天华物业' }
          ]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style lang="scss">
.partner-node {
  height: 353px;
  .home-title {
    display: flex;
    justify-content: space-between;
    .el-icon-chat-dot-round {
      color: #5f84ff;
    }
  }
}
.partner-node-content {
  display: flex;
    .partner-node-content-bar {
  width: 438px;
  height: 284px;
  // background-color: pink;
}
.partner-node-content-text {
    margin-top: 20px;
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    font-family: PingFangSC-Semibold,PingFang SC;
    .count {
    height: 33px;
    font-size: 24px;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
    padding-left: 10px;
    padding-right: 10px;
    }
    .count2 {
      margin-top: 20px;
    }
    .name {
    padding-left: 10px;
    padding-right: 10px;
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
    }
}
  }

</style>
