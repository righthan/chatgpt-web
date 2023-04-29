import type { Router } from 'vue-router'

export function setupPageGuard(router: Router){
    router.beforeEach(async( to, from,next)=>{
        // 暂未配置后端, 全部放行
        next()
    })
}