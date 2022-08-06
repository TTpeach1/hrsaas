import request from '@/utils/request'
/**
 * 获取组织架构数据
 * @returns 
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}


/** *
 *  根据id根据部门  接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 * **/
 export function delDeptsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 * 新增部门
 * @returns 
 */
export const addDeptsApi=(data)=>{
  return request({
    url:'/company/department',
    method: 'POST',
    data
  })
}

