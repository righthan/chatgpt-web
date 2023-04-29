<template>
    <div>
        <div class="p-2 rounded-md inline-block w-auto max-w-4xl align-bottom" :class="wrapClass">
            <div class="inline" v-text="text"/>
            <span v-if="loading" class="w-[2px] h-[15px] inline-block animate-blink"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
interface Props{
    inversion?: boolean
    error?: boolean
    loading?: boolean
    text?: string
}

const props = defineProps<Props>()
const wrapClass = computed(()=>{
    return [
        props.inversion ? 'bg-blue-100' : 'bg-gray-100',
        props.inversion ? 'text-right' : 'text-left'
    ]
})
</script>

<style scoped>

</style>