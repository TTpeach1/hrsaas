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

