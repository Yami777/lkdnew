
import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { Message } from 'element-ui'
export default {

  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async LoginAction({ commit }, loginForm) {
      try {
        const { data } = await login(loginForm)
        console.log(data)
        if (!data.success) {
          Message.error(data.msg)
        } else {
          commit('SET_TOKEN', data.token)
          commit('SET_USER_INFO', data)
        }
      } catch (error) {
        throw new Error()
      }
    },
    async getUserInfo(context) {
      // console.log(context)
      // console.log(context.state.userInfo.userId)
      const data = await getUserInfo(1)
      console.log(data)
    }
  }
}
