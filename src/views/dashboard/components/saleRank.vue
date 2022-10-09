<template>
  <div class="sale-rank">
    <!-- 标题区域 -->
    <div class="home-title">
      <span>   商品热榜</span>
      <span class="home-data-time">{{ month.start_time }}~{{ month.end_time }}</span>
    </div>
    <!-- 内容区域 -->
    <div v-for="(rank,index) in saleRankList" :key="rank.skuName" class="rank-content">
      <div class="left">
        <span :class="{rankImg:(index+1)===1,rankImg2:(index+1)===2,rankImg3:(index+1)===3,rankImg4:(index+1)!==1&&(index+1)!==2&&(index+1)!==3}">{{ index+1 }}</span>
        <span class="title">{{ rank.skuName }}</span>
      </div>
      <span class="count">{{ rank.count }}单</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getHotGoodsAPI } from '@/api/node'
export default {
  props: {
    month: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      saleRankList: []
    }
  },
  created() {
    this.getHotGoods()
  },
  methods: {
    async getHotGoods() {
      try {
        const { data } = await getHotGoodsAPI(10, dayjs().startOf('month').format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD'))
        // console.log(data)
        this.saleRankList = data
      } catch {
        throw new Error()
      }
    }
  }
}
</script>

<style  lang="scss">
.sale-rank {
  .rank-content {
    display: flex;
    justify-content: space-between;
    margin: 1.5625rem .3125rem;
  font-size: .875rem;
    .left {
      display: flex;
      .rankImg{
      margin-right: .625rem;
  width: 1.3125rem;
  height: 1.3125rem;
  background: url('~@/assets/lkdimg/top1.png');
  text-align: center;
  color: #ab5913;
}
.rankImg2{
        margin-right: .625rem;
  width: 1.3125rem;
  height: 1.3125rem;
  background: url('~@/assets/lkdimg/top2.png');
  text-align: center;
  color: #ab5913;
}
.rankImg3{
        margin-right: .625rem;
  width: 1.3125rem;
  height: 1.3125rem;
  background: url('~@/assets/lkdimg/top3.png');
  text-align: center;
  color: #ab5913;
}
.rankImg4{
         margin-right: .625rem;
  width: 1.3125rem;
  height: 1.3125rem;
  background: url('~@/assets/lkdimg/top4.png');
  text-align: center;
  color: #ab5913;
}
    }

  }
}

</style>
