import request from '@/utils/request'
/**
 *  登陆请求
 * @param {Object} data  password mobile
 * @returns promise 
 */
export function loginApi(data) {
    return request({
        url:'/sys/login',
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


