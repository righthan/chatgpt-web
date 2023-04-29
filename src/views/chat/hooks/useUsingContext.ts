import {computed} from 'vue'
import { useChatStore } from '@/stores'
import { ElMessage } from 'element-plus'
import {t} from '@/locales'

export function useUsingContext(){
    const chatStore = useChatStore()
    const usingContext = computed<boolean>(()=>chatStore.usingContext)

    // 触发操作对usingContext取反
    function toggleUsingContext(){
        chatStore.setUsingContext(!usingContext.value)
        if(usingContext.value){
            ElMessage({
                type: 'success',
                showClose: true,
                message: t('chat.turnOnContext'),
                center: true,
                offset:100
              })
        }else{
            ElMessage({
                showClose: true,
                message: t('chat.turnOffContext'),
                center: true,
                offset:100
              })
        }
    }

    return {
        usingContext,
        toggleUsingContext
    }
}