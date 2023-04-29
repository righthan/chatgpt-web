import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ChatLayout } from '@/views/chat/layout'
import { setupPageGuard } from './permission'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    children:[
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: ()=>import('@/views/chat/index.vue')
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    component: ()=> import('@/views/exception/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior:()=>({left: 0, top:0}) // 设置录用的滚动行为(跳转之后可以指定滚动到的位置)
})

setupPageGuard(router)

export async function  setupRouter(app:App) {
  app.use(router)
  await router.isReady()
}
