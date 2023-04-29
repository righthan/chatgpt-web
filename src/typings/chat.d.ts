declare namespace Chat{
    interface Chat{
        dateTime: string
        text: string
        inversion ?:boolean // 控制问答的组件的样式
        error?: boolean
        loading?: boolean
        conversationOptions?:ConverSationRequest | null
        requestOptions: { prompt: string; options?: ConversationRequest | null }
    }

    interface History{
        title: string
        isEdit: boolean
        uuid: number
    }

    interface ChatState{
        active: number | null  // 当前使用的对话的uuid
        usingContext: boolean;
        history: History[]
        chat: {uuid:number; data: Chat[]}[]
    }

    // 对话请求
    interface ConversationRequest{
        conversationId?:string
        parentMessageId?: string
    }
    
    // 对话响应
    interface ConversationResponse{
        conversationId: string
        detail:{
            choices:{finish_reason:string; index:number; logprobs:any; text: string}[]
            created: number
            id: string
            model: string
            object: string
            usage: { completion_tokens: number; prompt_tokens:number; total_tokens:number}
        }
        id: string
        parentMessageId: string
        role: string
        text: string
    }
}

