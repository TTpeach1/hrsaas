import request from '@/utils/request'
/**
 * 获取列表数据
 * @param {*} params
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 根据id获取角色详情
 * @param {*} id 
 * @returns 
 */
export function getRolesInfo(id) {
  return request({
    url: `/sys/role/${id}`,
  })
}
/**
 *  给角色分配权限
 * @param {*} data 
 * @returns 
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}