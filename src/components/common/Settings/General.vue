<template>
    <el-form label-width="110px" label-position="left">
        <el-form-item :label="$t('setting.avatarLink')">
            <el-input v-model="avatar" class="max-w-xs" />
            <el-button type="primary" @click="updateUserInfo({ avatar })" link>{{ t('common.save') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('setting.name')">
            <el-input v-model="name" class="max-w-xs" />
            <el-button type="primary" @click="updateUserInfo({ name })" link>{{ t('common.save') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('setting.description')">
            <el-input v-model="description" class="max-w-xs" />
            <el-button type="primary" @click="updateUserInfo({ description })" link>{{ t('common.save') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('setting.chatHistory')">
            <el-button :icon="Download">{{ t('common.export') }}</el-button>
            <el-button :icon="Upload">{{ t('common.import') }}</el-button>
            <el-button :icon="Delete" @click="clearData">{{ t('common.clear') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('setting.language')">
            <el-select  v-model="language" placeholder="Select" @change="changeLanguage">
                <el-option v-for="item in languageOptions" :key="item.key" :label="item.label" :value="item.value"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('setting.resetUserInfo')">
            <el-button @click="handleReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Download, Upload, Delete } from '@element-plus/icons-vue';
import { useAppStore, useUserStore } from '@/stores';
import type { UserInfo } from '@/stores/modules/user/helper';
import { ElMessage } from 'element-plus'
import { t } from '@/locales'
import type { Language } from '@/stores/modules/app/helper';

const appStore = useAppStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const avatar = ref(userInfo.value.avatar ?? '')
const name = ref(userInfo.value.name ?? '')
const description = ref(userInfo.value.description ?? '')
const language = computed({
    get(){
      return appStore.language 
    },
    set(value:Language){
        appStore.setLanguage(value)
    }
})

const showMessage = () => {
    ElMessage({
        message: t('common.success'),
        type: 'success',
        offset: 300
    })
}
function updateUserInfo(options: Partial<UserInfo>) {
    userStore.updateUserInfo(options)
    showMessage()
}

const languageOptions: { label: string; key: Language; value: Language }[] = [
    { label: '简体中文', key: 'zh-CN', value: 'zh-CN' },
    { label: '繁體中文', key: 'zh-TW', value: 'zh-TW' },
    { label: 'English', key: 'en-US', value: 'en-US' },
]

function clearData(): void {
    localStorage.removeItem('chatStorage')
    location.reload()
    ElMessage({
        message: t('common.clearSuccess'),
        type: 'success',
        offset: 300
    })
}

function changeLanguage(value: any){
   appStore.setLanguage(value)
}

function handleReset() {
    userStore.resetUserInfo()
    showMessage()
    window.location.reload()
}

</script>

<style scoped>
.el-form-item__content {
    flex-wrap: nowrap;
}
</style>