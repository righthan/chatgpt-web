import axios, { type AxiosResponse} from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_GLOBL_API_URL,
})

service.interceptors.request.use(
    (config)=>{
        // 尚未实现token
        // config.headers.Authorization = `Bearer $`
        return config
    },
    (error)=>{
        return Promise.reject(error.response)
    }
)

service.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse =>{
        if(response.status === 200){
            return response    
        }
        throw new Error(response.status.toString())
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default service