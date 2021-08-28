import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout';
import Goods from '../views/Goods';
import Login from '../views/Login';
import store from '../store'
console.log(store);
//按需加载组件
const Advert =   () =>import('../views/Advert')
const User =   () =>import('../views/User')
const Params =   () =>import('../views/Params')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true
    },
    children:[
      {
        path: '/',
        name: 'Goods',
        component: Goods,
      },
      {
        path:'/params',
        name:'Params',
        component:Params 
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      },
    ]
  },{
    path:'/login',
    name: 'Login',
    component: Login
  }
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach((to,from,next)=>{
   if(to.matched.some(ele=>ele.meta.isLogin)){//需要登陆
     //判断当前是否登录
     let token=store.state.LoginModule.userInfo.token; 
     if(token){
       next()
     }else{
       next('/login')
     }
   }else{//不需要登录
     next()
   }
})


export default router
