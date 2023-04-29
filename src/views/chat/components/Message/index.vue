<template>
    <div class="flex" :class="[{'flex-row-reverse': inversion}]">
        <div class="mx-2">
            <AvatarComponent :image="inversion"/>
        </div>
        <div class="flex flex-col" :class="[inversion ? 'items-end': 'items-start' ]">
            <!--时间 -->
            <!-- 应该是传过来的值,先这样,以后再删除 -->
            <p class="text-xs text-gray-400" :class="[inversion ? 'text-right': 'text-left' ]">{{ dateTime }}</p>
            <div class="my-2" >
                <TextComponent
                    ref="textRef"
                    :inversion="inversion"
                    :error="error"
                    :text="text"
                    :loading="loading"
                    :as-raw-text="asRawText"
                />
            </div>
        </div>    
    </div>
   
</template>

<script setup lang="ts">
import AvatarComponent from './Avatar.vue'
import TextComponent from './Text.vue'
import { ref} from 'vue'

interface Props{
    dateTime?: string
    text?: string
    inversion?: boolean
    error?: boolean
    loading?: boolean
}

const props = defineProps<Props>()
const asRawText = ref(props.inversion)
</script>

<style scoped>

</style>