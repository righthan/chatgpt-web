<template>
    <!-- 整个聊天窗口的布局 -->
    <div class="h-screen p-4 overflow-hidden">
        <el-card class="h-full" :body-style="{ padding: '0 20px', height: '100%' }">
            <el-container class="h-full">
                <ChatAside/>
                <!-- 使用路由切换组件 -->
                <RouterView v-slot="{ Component, route}">
                    <component :is="Component" :key="route.fullPath"/>
                </RouterView>
            </el-container>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useChatStore } from "@/stores";
import ChatAside from "./sider/index.vue"
import { useRouter} from 'vue-router'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()

// 加载组件时默认使用上次处于激活的对话
router.replace({name: 'Chat', params: {uuid: chatStore.active}})
</script>

<style scoped>
.el-main{
    padding: 10px;
}

</style>