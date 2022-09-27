import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 配置请求拦截器
service.interceptors.request.use(config => {
  console.log(config)
  if (store.getters.token) {
    config.data = `${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default service
