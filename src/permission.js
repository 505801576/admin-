import router from "./router"
import { getToken } from "./utils/auth"


router.beforeEach((to,from,next)=>{
  const token = getToken()
  if(token || to.path === '/login'){
     next()
  } else if(to.path === '/404'){
    next()
  } else {
    next('/login')
  }
})

