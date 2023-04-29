<!-- 侧边栏下部的头像,设置区 -->
<template>
  <footer class="flex items-center justify-between w-full min-w-0 p-4 border-t">
    <!-- 头像区 -->
    <div class="flex-1 flex-shrink-0">
      <UserAvatar />
    </div>
    <!-- 设置按钮 -->
    <el-button :icon="Setting" @click="handleSetting" circle/>
    <!-- 设置界面对话框 -->
    <Settings v-model:visible="show"/>
    
  </footer>
</template>   

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { UserAvatar } from '@/components/common';
import { Setting } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'

const Settings = defineAsyncComponent(()=> import ('@/components/common/Settings/index.vue'))
const show = ref(false)
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const dialogVisible = ref(true)
const handleSetting = function () {
  show.value = true
}
</script>

<style scoped></style>