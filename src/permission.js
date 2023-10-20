// router.beforeEach((to,from,next)=>{
//   const token = getToken()
//   if(token || to.path === '/login'){
//      next()
//   } else if(to.path === '/404'){
//     next()
//   } else {
//     next('/login')
//   }
// })