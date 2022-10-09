import request from '@/utils/request'
/**
 * 获取点位数总数（首页echarts点位商）
 * @returns
 */
export const getNodeCountAPI = () => {
  return request({
    url: 'vm-service/node/count'
  })
}

/**
 * 获取合作商数（echarts合作商数）
 * @returns
 */
export const getPartnerCountAPI = () => {
  return request({
    url: 'user-service/partner/count'
  })
}
/**
 * 获取合作商点位数
 * @returns
 */
export const getNodeCollectAPI = () => {
  return request({
    url: 'vm-service/node/nodeCollect'
  })
}
/**
 * 获取每个月销售前十的商品
 * @param {Number} topValue 10
 * @param {String} start 每个月开始的时间2022-10-01
 * @param {String} end 每个月结束的时间 2022-10-31
 * @returns
 */
export const getHotGoodsAPI = (topValue, start, end) => {
  return request({
    url: `order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}
