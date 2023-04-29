import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'

export const useUserStore = defineStore('user-store', {
    state: ():UserState => getLocalState(),
    actions:{
        updateUserInfo(userInfo: Partial<UserInfo>){
            this.userInfo = { ...this.userInfo, ...userInfo}
        },

        resetUserInfo(){
            this.userInfo = { ...defaultSetting().userInfo}
        },

        recordState(){
            setLocalState(this.$state)
        }
    }
})
