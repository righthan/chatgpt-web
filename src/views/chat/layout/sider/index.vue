<template>
    <!-- Footer和List组件的容器 -->
    <el-aside width="260px">
        <div class="h-full flex flex-col justify-between items-center border-r">
            <main class="overflow-hidden">
                <el-button class="my-2 mr-3 w-60" @click="handleAdd">{{ $t('chat.newChatButton')}}</el-button>
                <List />
            </main>
            <Footer/>
        </div>
    </el-aside>
</template>

<script setup lang="ts">
import List from './List.vue'
import Footer from './Footer.vue'
import { useChatStore} from '@/stores'

const chatStore = useChatStore()

const handleAdd = function(){
    // 使用创建的时间Date.now()作为uuid
    chatStore.addHistory({title:'New Chat', uuid: Date.now(),isEdit:false})
}



</script>

<style scoped>
.el-button {
    padding: 8px;
}
</style>