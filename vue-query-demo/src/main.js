import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'

const app = createApp(App)
app.use(ElementPlus).use(router)

// vue-query
import { VueQueryPlugin } from '@tanstack/vue-query'
const vueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, //当窗口获得焦点时是否要重新获取数据
                staleTime: 5*1000 * 60 //数据的缓存时间 单位：毫秒
            }
        }
    }
}
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount('#app')
