<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLanguage } from './hooks/useLanguage'

const { language } = useLanguage()


</script>

<template>
  <el-config-provider :locale="language">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
