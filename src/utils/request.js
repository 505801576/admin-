import axios from 'axios'
import { getToken } from './auth'
import { Message,removeToken } from 'element-ui'
import router from '@/router'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
   /* 获取token 并传给后端 */
  const token = getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.dir(error);
    if(error.response.status === 401){
      // removeToken()
      router.push('/login')
    }
    Message.error(error.response.data.msg)
    return Promise.reject(error)
  }
)

export default service
