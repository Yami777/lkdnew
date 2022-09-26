import request from '@/utils/request'
/**
 * 获取图片验证码
 * @param {String} clientToken 随机数
 * @returns
 */
export function getVerificationCodeAPI(clientToken) {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`
  })
}

export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
