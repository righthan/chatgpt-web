<template>
    <el-dialog v-model="show" :title="$t('setting.setting')" width="35%"  destroy-on-close align-center>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane name="first">
          <template #label>
            <span class="flex items-center space-x-1">
              <el-icon>
                <SetUp />
              </el-icon>
              <span>{{ $t('setting.general') }}</span>
            </span>
          </template>
          <General/>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <span class="flex items-center space-x-1">
              <el-icon><InfoFilled /></el-icon>
              <span>{{ $t('setting.config') }}</span>
            </span>
          </template>
          <Config/>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="show = false">
            {{$t('common.confirm')}}
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import General from './General.vue'
import Config from './Config.vue'
import { computed, ref} from 'vue'


interface Props{
  visible: boolean
}
interface Emit{
  (e:'update:visible', visible: boolean):void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const show = computed({
  get(){
    return props.visible
  },
  set(visible: boolean){
    emit('update:visible', visible)
  }
})
const activeName = ref('first')
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }

</script>

<style scoped>

</style>