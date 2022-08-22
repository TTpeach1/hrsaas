export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      //聚焦元素
      el.onerror = function () {
        el.src = value
      }
    }
  },
  //指令所绑定的元素更新的时候触发
  update(el,{value}){
    if(!el.src){
      el.src = value
    }
  }
}
import store from '@/store'
export const isHas = {
  inserted(el,binding) {
    const has = store.state.permission.points.includes(binding.value)
    if(!has){
      el.remove()
    }
  }
}
