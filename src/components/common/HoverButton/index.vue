<template>
    <div v-if="showToolTip">
        <n-tooltip :placement="placement" trigger="hover">
            <template #trigger>
                <Button @clikc="handleClick">
                    <slot />
                </Button>
            </template>
            {{ tooltip }}
        </n-tooltip>
    </div>
    <div v-else>
        <Button @clikc="handleClick">
            <slot />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PopoverPlacement } from 'naive-ui'

interface Props {
    tooltip?: string
    placement?: PopoverPlacement
}

interface Emit {
    (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
    tooltip: '',
    placement: 'bottom'
})

const emit = defineEmits<Emit>()

const showToolTip = computed(() => Boolean(props.tooltip))

function handleClick() {
    emit('click')
}
</script>

<style scoped></style>