// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
const service = axios.create({
  // baseURL: 'http://localhost:8888/api',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

//声明一个函数
const timeOut = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 4 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
// 请求拦截器
service.interceptors.request.use(async (config) => {
  // console.log(config,store.state.user.token)
  if (store.state.user.token) {
    if (timeOut()) {
      // console.log('跳到login')
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登陆过期'))
    } else {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // console.log(res);
    //请求成功的函数
    //解构
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    if (error?.response?.status === 401) {
      Message.error('登陆过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      // Message.error('系统异常')
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service // 导出axios实例
