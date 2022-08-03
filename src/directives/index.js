export const imgError = {
  inserted: function (el, { value }) {
    //聚焦元素
    el.onerror = function () {
      el.src = value
    }
  }
}

export const aa = {
  inserted() {}
}
