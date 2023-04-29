import { deCrypto, enCrypto} from '../crypto'

interface StorageData<T = any>{
    data: T
    expire: number | null
}

/**
 * 创建本地存储
 * @param options 创建store时的选项，expire存储时间，crypto是否加密
 */
export function createLocalStorage(options?:{expire?: number | null; crypto?:boolean}){
    const DEFAULT_CACHE_TIME = 60*60*24*7
    // 对象的拷贝（用于整合默认的和用户设定的options,并且拷贝中用户设置的options会把默认的覆盖，参见assign的用法）
    const { expire, crypto } = Object.assign(
        {
            expire: DEFAULT_CACHE_TIME,
            crypto: true
        },
        options,
    )
    
    /**
     * 根据是否存储时间和是否加密处理数据
     * @param key 
     * @param data 
     */
    function set<T = any>(key:string, data: T){
        const storageData:StorageData<T> = {
            data, 
            expire: expire !==null? new Date().getTime()+expire * 1000 : null,
        }

        const json = crypto? enCrypto(storageData): JSON.stringify(storageData)
        window.localStorage.setItem(key, json)
    }

    function get(key:string){
        const json = window.localStorage.getItem(key)
        if(json){
            let storageData: StorageData| null = null
            try{
                storageData = crypto? deCrypto(json): JSON.parse(json)
            }catch{
                // Prevent Failure
            }

            if(storageData){
                const { data, expire} = storageData
                if(expire === null|| expire>=Date.now()){
                    return data
                }
            }

            // 如果键不存在或失效则删除
            remove(key)
            return null
        }
    } 
    
    function remove(key:string){
        window.localStorage.removeItem(key)
    }

    function clear(){
        window.localStorage.clear
    }

    return {
        set,
        get,
        remove,
        clear
    }
}

export const ls = createLocalStorage()

export const ss = createLocalStorage({expire: null, crypto: false})