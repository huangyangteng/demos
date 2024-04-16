<template>
    name:
    <el-input v-model="searchName" style="width: 240px" />
    {{ typeof deleteLoading }}
    <el-table
        v-loading="isFetching"
        :data="data?.users"
        style="width: 100%; position: relative">
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="role" label="Role" />
        <el-table-column label="Options">
            <template #default="scope">
                <el-button
                    :loading="deleteLoading && scope.row.id === opId"
                    type="danger"
                    @click="del(scope.row)"
                    >删除</el-button
                >
                <el-button type="primary" @click="toDetail(scope.row.id)">详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="onPageChange"
        :total="data?.total || lastTotal"
        background
        layout="total,prev, pager, next"
        style="margin-top: 10px" />

    <!-- detail modal -->
    <!-- detail page -->
</template>

<script setup>
import { fetchUsers, deleteUser } from './api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const searchName = ref('')
const pageSize = ref(5)
const currentPage = ref(1)
const lastTotal = ref(0) //处理element-ui分页的bug
const { isFetching, data } = useQuery({
    queryKey: ['users', searchName, currentPage, pageSize],
    queryFn: async () => {
        const res = await fetchUsers({
            name: searchName.value,
            page: currentPage.value,
            pageSize: pageSize.value
        })
        lastTotal.value = res.data.total
        // 可以在这里为变量赋值
        return res.data
    },
    keepPreviousData: true
})

const onPageChange = (cur) => {
    currentPage.value = cur
}

// -----删除
const queryClient = useQueryClient()

const { mutate, isPending: deleteLoading } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (data) => {
        console.log('success', data)
        queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
        console.log('error', error)
    }
})
const opId = ref(-1) //当前操作的数据的id
const del = (row) => {
    opId.value = row.id
    mutate(row.id)
}
const router=useRouter()
const toDetail=(id)=>{
    router.push('/detail/'+id)
}
</script>
