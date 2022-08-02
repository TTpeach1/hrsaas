import {loginApi} from '@/api/user'
export default {
  namespaced: true,
  state: {
    token:''
  },
  mutations: {
    setToken(state,payload){
      state.token = payload
    }
  },
  actions: {
    async getToken(context,data){
      const res = await loginApi(data)
      console.log(res);
      context.commit('setToken',res)
    }
  }
}
