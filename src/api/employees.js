import request from '@/utils/request'

/**
 * 获取员工信息
 * @returns 
 */
export const getEmployessApi=() =>{
    return request ({
        url:'/sys/user/simple',
    })
}