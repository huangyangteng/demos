<template>
    <section>
        <h1>
            useQuery要写在最外层,默认情况下mounted时会请求数据，如果想要在需要的时候请求数据，需要使用enabled属性
        </h1>
        <h1>例子-登录之后再请求数据</h1>
        <p>
            登录状态：{{ isLogin }}
            <button @click="login">
              登录
            </button>
        </p>
        isFetching:{{ isFetching }}<br />
        data: {{ data }} <br />

        <h1>注意事项：enabled的值必须是可响应式的(Ref)</h1>
        <h2>reactive包装的属性不行，需要使用toRef或者computed包装一下</h2>

    </section>
</template>

<script setup>
import { fetchAllUsers } from './api'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref,reactive,toRef } from 'vue'
const isLogin = ref(false)

const obj=reactive({
    login:false
})
const login=()=>{
    isLogin.value=true
    
}

const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: fetchAllUsers,
    enabled: isLogin  
})


//test code

//obj.login=true
// const userLogined=()=>{
//     return obj.login
// }
 //toRef(obj,'login')
</script>
<style scoped></style>
