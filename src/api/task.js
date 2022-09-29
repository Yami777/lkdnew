import request from '@/utils/request'
export const getAllTaskStatusAPI = () => {
  return request({
    url: 'task-service/task/allTaskStatus'
  })
}
