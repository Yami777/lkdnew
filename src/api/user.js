import request from '@/utils/request'
export function login() {

}

export function getUserInfo(id) {
  return request({
    url: `/user-service/user/${id}`
  })
}

export function logout() {

}
