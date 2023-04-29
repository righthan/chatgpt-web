<template>
  <!-- 对话切换列表 -->
  <el-scrollbar max-height="540px">
    <div class="w-full">
      <!-- 如果没有聊天历史则显示没有 数据的icon和没有数据的文字提示 -->
      <!-- 虽然一开始没有会自动创建一个新对话,但是新对话也删除了就得显示no data -->
      <template v-if="!dataSources.length">
        <el-empty :description="$t('common.nodata')" />
      </template>
      <template v-else>
        <div v-for="(item, index) in dataSources" :key="index">
          <a class="relative flex items-center cursor-pointer border-solid border-2 break-all border-gray-200	rounded p-2 my-1 mr-3"
            :class="isActive(item.uuid) && ['bg-blue-100']" @click="handleSelect(item)">
            <!-- 聊天气泡小图标 -->
            <el-icon class="mx-2">
              <ChatDotSquare />
            </el-icon>
            <!-- 如果正在编辑则显示对话标题的框,可以使用input修改名字,否则展示span中的内容 -->
            <div class="relative w-36 overflow-hidden break-all text-ellipsis whitespace-nowrap">
              <el-input v-if="item.isEdit" size="small"  v-model="item.title" placeholder="请输入名称" @keypress="handleEnter(item, false, $event)" />
              <span v-else>{{ item.title }}</span>
            </div>

            <!-- 如果处于选中则展示编辑和删除的icon -->
            <div class="flex space-x-2 absolute right-2" v-if="isActive(item.uuid)">
              <template v-if="item.isEdit">
                <!-- 保存按钮, 因为使用了v-model,可以实现不点击保存按钮也能保存 -->
                <button class="bg-transparent -mb-0.5" @click="handleEdit(item, false)">
                  <el-icon><Folder /></el-icon>
                </button>
              </template>
              <template v-else>
                <button class="bg-transparent" @click="handleEdit(item, true)">
                  <el-icon>
                    <EditPen />
                  </el-icon>
                </button>
                <button class="bg-transparent" @click="handleDelete(index)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </button>
              </template>
            </div>
          </a>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, useChatStore } from '@/stores';

const appStore = useAppStore()
const chatStore = useChatStore()
const dataSources = computed(() => chatStore.history)

async function handleSelect({ uuid }: Chat.History) {
  // 判断是否是点击了已经处于active状态的对话
  if (isActive(uuid)) return

  if (chatStore.active) {
    chatStore.updateHistory(chatStore.active, { isEdit: false })
    await chatStore.setActive(uuid)
  }
}

function handleDelete(index: number){
    chatStore.deleteHistory(index)
}

function handleEdit({uuid}:Chat.History, isEdit: boolean){
  chatStore.updateHistory(uuid, {isEdit})
}

function handleEnter({uuid}: Chat.History, isEdit:boolean, event:KeyboardEvent){
  event?.stopPropagation() // 阻止事件冒泡
  if(event.key === 'Enter'){
    chatStore.updateHistory(uuid, {isEdit})
  }
}
function isActive(uuid: number) {
  return chatStore.active === uuid
}
</script>

<style scoped></style>