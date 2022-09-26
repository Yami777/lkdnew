
import { login } from '@/api/login'
import { Message } from 'element-ui'
export default {

  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
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
        }
      } catch (error) {
        throw new Error()
        // if (error.response) {
        //   Message.error(error.msg)
        // } else {
        //   throw new Error()
        // }
      }
    }
  }
}
