import request from '@/utils/request'
/**
 * 获取工单状态列表
 * @returns
 */
export const getAllTaskStatusAPI = () => {
  return request({
    url: 'task-service/task/allTaskStatus'
  })
}

/**
 * 工单搜索
 * @param {Object} params status: start:每年开始日期2022-01-01，每年结束日期：2022-12-31 isRepair：false pageIndex，pageSize
 * @returns
 */
export const getSearchTaskAPI = (params) => {
  return request({
    url: 'task-service/task/search',
    params
  })
}

/**
 * 获取每个月的订单状态(工单总数、完成、取消、进行工单)
 * @param {String} start 开始日期
 * @param {String} end 结束日期
 * @returns
 */
export const getTaskStatusAPI = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

/**
 * 获取补货预警值（运营工单里面的工单配置）
 * @returns
 */
export const getSupplyAlertValueAPI = () => {
  return request({
    url: 'task-service/task/supplyAlertValue'
  })
}

/**
 * 设置自动补货预警值
 * @param {Number} data 50代表满量的50%为补货预警值
 * @returns
 */
export const postAutoSupplyConfigAPI = (data) => {
  return request({
    url: 'task-service/task/autoSupplyConfig',
    method: 'POST',
    data
  })
}
