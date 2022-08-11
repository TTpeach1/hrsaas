import router from '@/router'
import store from '@/store'

//路由（全局）前置守卫
//会在所有路由进去之前触发
//to:去哪里的路由信息
//from：来自于哪个路由的信息
//next：是否进入
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  //1.登录
  if (token) {
    // 是否进入登录页
    await store.dispatch('user/getUserInfo')
    //进去当前页面立即获取数据
    if (to.path === '/login') {
      // 1.1 是跳到首页
      next('/')
    } else {
      // 1.2不是直接进入
      next()
    }
  } else {
    // 2.未登陆
    const isCludes = whiteList.includes(to.path)
    // 访问的是否在白名单(未登录也能访向的页面
    if (isCludes) {
      // 2.1在白名单 放行
      next()
    } else {
      // 2.2不在白名单(不登录不能访问） 跳到登录页
      next('/login')
    }
  }
})
