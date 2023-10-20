import request from '@/utils/request'

/* 楼宇 列表 */
export const getList=({name,page,pageSize})=>{
  return request.get('/park/building',{
    params:{
      name,
      page,
      pageSize,
    }
  })
}

/* 删除接口 */
export const delList = (id) => {
  return request.delete(`/park/building/${id}`,{
    id
  })
}


/* 添加楼宇 */
export const addList =({name,floors,area,propertyFeePrice}) =>{
  return request.post('/park/building',{
    name,
    floors,
    area,
    propertyFeePrice
  })
}

/* 楼宇查询 */
export const changeList=(id)=>{
  return request.get(`/park/building/${id}`,{
    id
  })
}

/* 修改楼宇 */
export const alterList =({id,name,floors,area,propertyFeePrice}) =>{
  return request.put('/park/building',{
    id,
    name,
    floors,
    area,
    propertyFeePrice
  })
}