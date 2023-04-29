<template>
  <!-- 聊天对话列表界面 -->
  <el-main>
    <div class="h-full flex flex-col justify-between">
      <!-- 上方对话列表取 -->
      <main class="overflow-hidden">
        <div>
          <div id="image-wrapper">
            <!-- <el-button @click="scroll">Default</el-button> -->
            <!-- 历史记录为空则显示一个icon及Hello~ -->
            <template v-if="!dataSources.length">
              <div class="flex items-center justify-center text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" width="2em" height="2em">
                  <path
                    d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z"
                    fill="currentColor" />
                </svg>
                <span style="font-size: 2em;">Hello~</span>
              </div>
            </template>
            <!-- 历史记录不为空则显示Message的对话列表 -->
            <template v-else>
              <el-scrollbar class="overflow-hidden" max-height="640px" id="scrollbarRef" ref="scrollbarRef">
                <div ref="innerRef">
                  <Message v-for="(item, index) of dataSources" :key="index" :date-time="item.dateTime" :text="item.text"
                    :inversion="item.inversion" :error="item.error" :loading="item.loading" />
                </div>
              </el-scrollbar>
            </template>
          </div>
        </div>
      </main>
      <!-- 下方页脚(清空对话,输入等) -->
      <footer class="flex items-center space-x-1 w-full my-2">
        <div class="flex  items-center space-x-1 w-full">
          <!-- 清空对话按钮 -->
          <el-popconfirm :title="$t('chat.clearHistoryConfirm')" :confirm-button-text="$t('common.yes')"
            :cancel-button-text="$t('common.no')" @confirm="handleClear">
            <template #reference>
              <el-button :icon="Delete" size="large" circle />
            </template>
          </el-popconfirm>
          <!-- 保存会话到图片按钮 -->
          <el-button :icon="Download" size="large" circle @click="handleExport" />
          <!-- 是否启用连续对话 -->
          <el-button class="hover:bg-transparent focus:bg-transparent" 
          :class="[usingContext ? 'focus:text-[#88898c]': 'text-red-500 focus:text-red-500']" 
          :icon="ChatLineRound" size="large"
          :title="t('chat.usingContext')"
           circle  @click="toggleUsingContext"/>
          <!-- 输入框 -->
          <el-input autosize type="textarea" resize="none" v-model="prompt" :placeholder="$t('chat.placeholder')"
            @keypress="handleEnter" />
          <!-- 发送按钮 -->
          <el-button type="primary" :icon="Promotion" @click="handleSubmit"></el-button>
        </div>
      </footer>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { Delete, Download, ChatLineRound, Promotion } from '@element-plus/icons-vue';
import { Message } from './components';
import { computed, ref, onMounted } from 'vue'
import { useChatStore } from '@/stores';
import { useRoute } from 'vue-router'
import { useChat } from './hooks/useChat'
import { useUsingContext } from './hooks/useUsingContext'
import { fetchChatAPIProcess } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { t } from '@/locales'
import html2canvas from 'html2canvas'

let controller = new AbortController() // 这个AbortController允许中断web请求

const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'

const route = useRoute()
const { uuid } = route.params as { uuid: string }

const chatStore = useChatStore()
const dataSources = computed(() => chatStore.getChatByUuid(+uuid)); // +号将字符串温和地转换为数字(温和:表示如果转换不成功将保持字符串类型而不报错)
const conversationList = computed(() => dataSources.value.filter(item => (!item.inversion && !item.error)))

const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat()
const { usingContext, toggleUsingContext } = useUsingContext()

const prompt = ref<string>('')  // 提词
const loading = ref<boolean>(false)

import { ElScrollbar } from 'element-plus'

const height = ref(0) // 滚动区域的高度
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

async function srollToBottom() {
  height.value = innerRef.value ? innerRef.value.scrollHeight : 0
  scrollbarRef.value?.setScrollTop(height.value)
}

onMounted(() => {
  // height.value =  innerRef.value? innerRef.value.scrollHeight: 0
  srollToBottom()
})


// 未知原因刷新页面,loading状态不会重置, 手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading) {
    updateChatSome(+uuid, index, { loading: false })
  }
})

const handleExport = () => {
  if (loading.value) {
    return
  }

  ElMessageBox.confirm(
    t('chat.exportImageConfirm'),
    t('chat.exportImage'),
    {
      confirmButtonText: t('common.yes'),
      cancelButtonText: t('common.no'),
      type: 'warning',
      // 导出时显示等待信息
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = t('common.loading')
          async function exportChat(){
            const ele = document.getElementById('image-wrapper')
            const canvas = await html2canvas(ele as HTMLDivElement, {
              useCORS: true
            })
            const imgUrl = canvas.toDataURL('image/png')
            const tempLink = document.createElement('a')
            tempLink.style.display = 'none'
            tempLink.href = imgUrl
            tempLink.setAttribute('download', 'chat-shot.png')
            if (typeof tempLink.download === 'undefined')
              tempLink.setAttribute('target', '_blank')

            document.body.appendChild(tempLink)
            tempLink.click()
            document.body.removeChild(tempLink)
            window.URL.revokeObjectURL(imgUrl)
            Promise.resolve()
          }
          try {
            exportChat()
          } catch (error) {
            ElMessage({
              type: 'info',
              message: t('chat.exportFailed'),
            })
          }
          finally{
            instance.confirmButtonLoading = false
            done()
          }
        } else {
          done()
        }
      },
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: t('chat.exportSuccess'),
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: t('chat.exportFailed'),
      })
    })

}
const handleEnter = function (event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}

function handleSubmit() {
  onConversation()
}

// 正在对话: 提交提词后包括将loading设置为true的操作
async function onConversation() {
  let message = prompt.value

  // 正在对话则终止
  if (loading.value)
    return

  if (!message || message.trim() === '')
    return

  controller = new AbortController()

  addChat(
    +uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: message,
      inversion: true,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    },
  )
  await srollToBottom()

  loading.value = true
  prompt.value = ''

  let options: Chat.ConversationRequest = {}
  const lastContext = conversationList.value[conversationList.value.length - 1]?.conversationOptions

  if (lastContext && usingContext.value)
    options = { ...lastContext }

  addChat(
    +uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: '',
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )
  await srollToBottom()

  try {
    let lastText = ''
    await srollToBottom()
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<Chat.ConversationResponse>({
        prompt: message,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          // Always process the final line
          const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
          let chunk = responseText
          if (lastIndex !== -1)
            chunk = responseText.substring(lastIndex)
          try {
            const data = JSON.parse(chunk)
            updateChat(
              +uuid,
              dataSources.value.length - 1,
              {
                dateTime: new Date().toLocaleString(),
                text: lastText + data.text ?? '',
                inversion: false,
                error: false,
                loading: true,
                conversationOptions: { conversationId: data.conversationId, parentMessageId: data.id },
                requestOptions: { prompt: message, options: { ...options } },
              },
            )

            if (openLongReply && data.detail.choices[0].finish_reason === 'length') {
              options.parentMessageId = data.id
              lastText = data.text
              message = ''
              return fetchChatAPIOnce()
            }

            srollToBottom()
          }
          catch (error) {
            //
          }
        },
      })
      updateChatSome(+uuid, dataSources.value.length - 1, { loading: false })
    }

    await fetchChatAPIOnce()
  }
  catch (error: any) {
    const errorMessage = error?.message ?? '出错了'
    console.log(errorMessage)
    if (error.message === 'canceled') {
      updateChatSome(
        +uuid,
        dataSources.value.length - 1,
        {
          loading: false,
        },
      )
      await srollToBottom()
      return
    }

    const currentChat = getChatByUuidAndIndex(+uuid, dataSources.value.length - 1)

    if (currentChat?.text && currentChat.text !== '') {
      updateChatSome(
        +uuid,
        dataSources.value.length - 1,
        {
          text: `${currentChat.text}\n[${errorMessage}]`,
          error: false,
          loading: false,
        },
      )
      return
    }

    updateChat(
      +uuid,
      dataSources.value.length - 1,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )
    await srollToBottom()
  }
  finally {
    loading.value = false
    await srollToBottom()
  }
}


function handleClear() {
  chatStore.clearChatByUuid(+uuid)
}
</script>

<style scoped>
.el-button {
  border: 0;
}
</style>