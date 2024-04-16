import axios from 'axios'
const BASE_URL = 'http://localhost:10000'
axios.defaults.baseURL = BASE_URL
// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response.data
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export function fetchAllUsers(){
    return axios.get('/user/all')
}
export function fetchUsers({ name, page, pageSize }) {
    return axios.get('/user/query', {
        params: {
            page,
            name,
            pageSize
        }
    })
}

export function fetchUserDetail(id){
    return axios.get('/user/detail/'+id)
}
export function deleteUser(id){
  return axios.post('/user/delete',{
    id
  })
}