
import { login } from '@/api/login'
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
      const { data } = await login(loginForm)
      console.log(data)
      commit('SET_TOKEN', data.token)
    }
  }
}
