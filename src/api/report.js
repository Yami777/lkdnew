import request from '@/utils/request'
/**
 * 获取一定时间内的销售额
 * @param {Object} params start开始时间2020-01-01 00:00:00 end结束时间2020-01-01 23:59:59
 * @returns
 */
export const getMonthSalesAPI = (params) => {
  return request({
    url: 'order-service/report/orderAmount',
    params
  })
}

/**
 * 获取每个月的订单量
 * @param {Object} params
 * @returns
 */
export const getPartnerORderAPI = (params) => {
  return request({
    url: 'order-service/report/orderCount',
    params
  })
}
/**
 * 获取销售额统计（echarts图表）
 * @param {String|Number} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {String} start 开始日期 2020-01-01
 * @param {Number} end 结束日期 2020-01-01
 * @returns
 */
export const getSeriesSaleDataAPI = (collectType, start, end) => {
  return request({
    url: `order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

