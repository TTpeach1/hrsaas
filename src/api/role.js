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
 * 新建角色
 * @param {*} data 
 * @returns 
 */
export function addRolesApi(data) {
    return request({
      url: '/sys/role',
      method: 'POST',
      data
    })
  }