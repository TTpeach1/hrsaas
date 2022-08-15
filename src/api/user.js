import request from '@/utils/request'
/**
 *  登陆请求
 * @param {Object} data  password mobile
 * @returns promise
 */
export function loginApi(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
//  export const  loginApi =(data) =>
//      request({
//         url:'/sys/login',
//         method: 'POST',
//         data
//     })
/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * 获取员工基本信息
 * @param {*} id 
 * @returns 
 */
export const getUserDetailApi = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}
/**
 * 删除员工接口
 * @param {*} id 
 * @returns 
 */
 export function delEmployeeApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/**
 * 保存员工信息
 * @param {*} data 
 * @returns 
 */
export function saveUserDetailByIdApi(data){
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
