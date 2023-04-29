import { createApp } from 'vue'
import { setupI18n } from './locales'
import './index.css'
import './preflight.css'  // 解决tailwind css与element组件的冲突 https://juejin.cn/post/7084614555598323719
import { setupRouter } from './router'
import { setupStore } from './stores'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

import App from './App.vue'

async function bootstrap(){
    const app = createApp(App)
    
    // 全局注册图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
      }
    setupI18n(app)
    setupStore(app)
    await setupRouter(app)

    app.mount('#app')
}

bootstrap()
