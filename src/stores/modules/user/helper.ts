import {ss} from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo{
    avatar: string
    name: string
    description: string
}

export interface UserState{
    userInfo: UserInfo
}

export function defaultSetting():UserState{
    return {
        userInfo:{
            avatar: 'https://kjimg10.360buyimg.com/ott/jfs/t20250412/134609/35/30968/16637/64373a2cFd844bf85/a96cfc2d5bed004e.png',
            name: 'Lee',
            description: 'Support on <a href="https://github.com/Chanzhaoyu/chatgpt-bot" class="text-blue-500" target="_blank" >Github</a>'
        }
    }
}


export function setLocalState(setting: UserState):void{
    ss.set(LOCAL_NAME, setting)
}

export function getLocalState():UserState{
    const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
    // 同时返回默认和用户设置项
    return {...defaultSetting(), ...localSetting}
}