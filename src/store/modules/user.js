import { loginApi, getUserInfoApi,getUserDetailApi } from '@/api/user'
import {setTokenTime} from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    //获取token
    async getToken(context, data) {
      const res = await loginApi(data)
      console.log(res)
      context.commit('setToken', res)
      setTokenTime()
    },
    //获取用户信息
    async getUserInfo(context, data) {
      //用户信息
      const userBaseInfo = await getUserInfoApi()
      //员工基本信息
      const userInfo = await getUserDetailApi(userBaseInfo.userId)
      context.commit('setUserInfo', {...userBaseInfo,...userInfo})
    },
    logout(context){
      context.commit('setToken','')
      context.commit('setUserInfo',{})
    }
  }
}
