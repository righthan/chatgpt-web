<template>
    <button @click="handleClick">
        <slot/>
    </button>
</template>

<script setup lang="ts">
interface Emit{
    (e: 'click'):void
}

const emit = defineEmits<Emit>()

function handleClick(){
    emit('click')
}
</script>

<style scoped>

</style>