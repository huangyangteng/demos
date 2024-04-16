<template>
    <section>
        status:{{ result.status }} <br />
        isPending: {{ result.isPending }}<br />
        isFetching:{{ result.isFetching }}<br />
        data: {{ result.data }} <br />
        <button @click="clear">清空缓存数据，重新请求数据</button>
        <button @click="changeId">change id</button>
    </section>
</template>

<script setup>
import { fetchAllUsers } from './api'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
const id = ref(0)
const result = useQuery({
    queryKey: ['user', id],
    queryFn: fetchAllUsers,
})
const queryClient = useQueryClient()
const clear = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] })
}
const changeId = () => {
    id.value++
}
</script>
<style scoped></style>
