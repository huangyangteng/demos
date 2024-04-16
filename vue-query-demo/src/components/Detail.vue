<template>
    <section>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ route.params.id }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="isPending" style="padding-left: 1em;">
            <p>name:{{data?.name}} </p>
            <p>age:{{data?.age}} </p>
            <p>weight:{{data?.weight}} </p>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {fetchUserDetail} from './api'
import { useQuery } from '@tanstack/vue-query'
const route = useRoute()

const { isPending, data } = useQuery({
  queryKey: ['user',route.params.id],
  queryFn: async()=>{
    const res=await fetchUserDetail(route.params.id)
    if(res.code===2000){
        return res.data
    }else{
        return null
    }
  },
})


</script>
<style scoped></style>
