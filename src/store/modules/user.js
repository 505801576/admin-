import { loginAPI } from '@/api/user'
import { getToken, removeToken, setToken } from "@/utils/auth"
export default {
  namespaced:true,
  state: {
     token: getToken() || ''
  },
  mutations: {
    /* 设置 token */ // ! token actions 并存入 仓库
    setToken(state, token) {
      state.token = token
       setToken(token)  
    },
    /*  删除 token */ // ! 本地仓库也要 清除 token
    delToken (state){
      state.token = ''
      removeToken()
    }
  },
  /* 异步请求 接口 */ // !  调接口 请求数据 并把 token 持久化
  actions: {
    async loginAction(ctx,data){  //! data 是组件表单传入的数据
     const res = await loginAPI(data)
    //  console.log(res);  //!  返回 token
     // !        方法名   接口返回的 token数据
     ctx.commit('setToken',res.data.token)
    }
  }
}
