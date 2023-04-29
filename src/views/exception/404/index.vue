<template>
   <div class="pt-28 flex flex-col items-center">
    <div>
        <h1 class="text-4xl	">{{ t('errorPage.notFoundTitle') }}</h1>
    </div>
    <p class="py-4">{{t('errorPage.notFoundInfo')}}</p>
    <div class="w-3/12 h-3/12	" >
        <img src="../../../icons/404.svg"/>
    </div>
    <div>
        <el-button type="primary" @click="goHome">{{ t('errorPage.goHome') }}</el-button>
    </div>
   </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {t} from '@/locales'

const router = useRouter()

function goHome(){
    router.push('/')
}
</script>

<style scoped>

</style>