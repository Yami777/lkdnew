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
 * @param {Object} params
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
