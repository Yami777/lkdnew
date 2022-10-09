<template>
  <div class="partner-node">
    <!-- 标题区域 -->
    <div class="home-title">
      <span>合作商点位数TOP5</span>
      <i class="el-icon-chat-dot-round" @click="$router.push('node/partner')" />
    </div>
    <el-row class="partner-node-content">
      <el-col :span="17"><div class="partner-node-content-bar" /></el-col>
      <el-col :span="7"><div class="partner-node-content-text">
        <div class="count">{{ nodeCount }}</div>
        <div class="name">点位数</div>
        <div class="count count2">{{ partnerCount }}</div>
        <div class="name">合作商数</div>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getNodeCountAPI, getPartnerCountAPI, getNodeCollectAPI } from '@/api/node'
export default {
  data() {
    return {
      nodeCount: 0,
      partnerCount: 0,
      nodeCollect: []
    }
  },
  created() {
    this.getNodeCount()
    this.getPartnerCount()
    this.getNodeCollect()
  },
  mounted() {

  },
  methods: {
    getAreaPartner() {
      var myChart = echarts.init(document.querySelector('.partner-node-content-bar'))
      const option = {
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [10, 70],
            center: ['40%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              formatter(ar) {
                return ar.name + ar.percent + '%'
              }
            },
            data: this.nodeCollect
          }
        ]
      }
      myChart.setOption(option)
    },
    async getNodeCount() {
      try {
        const { data } = await getNodeCountAPI()
        // console.log(data)
        this.nodeCount = data
      } catch {
        throw new Error()
      }
    },
    async getPartnerCount() {
      try {
        const { data } = await getPartnerCountAPI()
        // console.log(data)
        this.partnerCount = data
      } catch {
        throw new Error()
      }
    },
    async getNodeCollect() {
      try {
        const { data } = await getNodeCollectAPI()
        // console.log(data)
        this.nodeCollect = data
        this.getAreaPartner()
      } catch {
        throw new Error()
      }
    }
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
