import request from '@/utils/request'

/**
 * 获取员工信息
 * @returns
 */
export const getEmployessApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取员工列表
 * @param {*} params
 * @returns
 */
export const getEmployessInfoApi = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
/**
 * 新建角色
 * @param {*} data
 * @returns
 */
 export function delEmployeeApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/** **
 *  新增员工的接口
 * **/
 export function addEmployeeApi(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 * 批量导入员工
 * @param {*} data 
 * @returns 
 */
export function importEmployeesApi(data){
  return request({
    method: 'post',
    url: '/sys/users/batch',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetailApi(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
/** *
 *  更新用户详情的基础信息
 * **/
 export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data,
  })
}