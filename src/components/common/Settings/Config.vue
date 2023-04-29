<template>
    <div class="bg-neutral-100 text-black p-2 rounded">
        <p>
            项目学习自
            <a class="text-[#62aefd]" href="https://github.com/Chanzhaoyu/chatgpt-web" target="_blank">GitHub</a>
            的开源项目
        </p>
        <p>
            实现了大部分功能
        </p>
    </div>
    <div class="p-2 space-y-2">
        <p> {{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>
        <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
        <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>
        <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchChatConfig } from '@/api';

interface ConfigState {
    timeoutMs?: number
    reverseProxy?: string
    socksProxy?: string
    httpsProxy?: string
    balance?: string
    apiModel?: string
}

const loading = ref(false)
const config = ref<ConfigState>()

async function fetchConfig() {
    try {
        loading.value = true
        const { data } = await fetchChatConfig<ConfigState>()
        config.value = data
    }
    finally {
        loading.value = false
    }
}
onMounted(() => {
    fetchConfig()
})
</script>

<style scoped></style>