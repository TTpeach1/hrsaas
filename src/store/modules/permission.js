import router,{ asyncRouters, constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [] ,//我们自己维护的路由规则，因为菜单渲染不了$router.options.routes里面只能拿到静态路由，动态路由需要自己加
    points:[]
  },
  mutations: {
    setRouters(state, routes) {
      state.routes = { ...constantRoutes, ...routes }
    },
    setpoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRouters.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      console.log(routes)
      context.commit('setRouters', routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    },
    setPointsAction(context, points){
      context.commit('setpoints', points)
    }
  }
}