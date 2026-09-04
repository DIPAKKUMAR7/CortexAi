import { getModel } from "../models/index.js"



export const chatAgent = async (params) => {
    const llm = await getModel("chat")
    
    const prompt = "You are cortexAi, an intelligent AI agent ."

    const response = await llm.invoke([
        {
            "role": "system",
            "content": prompt
        },
        {
            "role": "user",
            "content": params.prompt
        }
    ])

    return {
        ...params,
        aiResponse: response.content
    }
}