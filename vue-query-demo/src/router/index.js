import {createRouter,createWebHistory} from 'vue-router'
// 定义路由
const routes=[
    {path:'/',name:'Account',component:()=>import('../components/Account.vue')},
    {path:'/detail/:id',name:'Detail',component:()=>import('../components/Detail.vue')},
    {path:'/demo',component:()=>import('../components/Demo.vue')},
    {path:'/enable',component:()=>import('../components/Enable.vue')}

]
const router=createRouter({
     history: createWebHistory(),
     routes
})
export default router