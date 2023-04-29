<template>
    <!-- 头像,右侧的用户名,用户简介 -->
    <div class="flex items-center">
        <!-- 头像 -->
        <div class="mx-2">
            <template v-if="isString(userInfo.avatar) && userInfo.avatar.length">
                <el-avatar :src="userInfo.avatar" @error="errorHandler">
                    <!-- 获取头像失败时加载的图像 -->
                    <img :src="defaultAvatar" alt="">
                </el-avatar>
            </template>
            <template v-else>
                <el-avatar :src="userInfo.avatar" />
            </template>
        </div>
        <!-- 用户名 -->
        <div>
            <h2>{{ userInfo.name ?? 'Lee' }}</h2>
            <!-- 用户简介 -->
            <p class="text-sm">
                <span v-if="true" v-html="userInfo.description">
                </span>
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is/'
import { useUserStore } from '@/stores';

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const errorHandler = () => true
</script>

<style scoped></style>