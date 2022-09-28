
import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { Message } from 'element-ui'
export default {

  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    userMsg: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_USER_MSG(state, userMsg) {
      state.userMsg = userMsg
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    REMOVE_USE_MSG(state) {
      state.userInfo = {}
      state.userMsg = {}
    }
  },
  actions: {
    async LoginAction({ commit }, loginForm) {
      try {
        const { data } = await login(loginForm)
        // console.log(data)
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
      const { data } = await getUserInfo(context.state.userInfo.userId)
      // console.log(data)
      context.commit('SET_USER_MSG', data)
    },
    logout({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_USE_MSG')
    }
  }
}
