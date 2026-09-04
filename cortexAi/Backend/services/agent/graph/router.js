import { getModel } from "../config/llmModels.js"


export const router = async (state) => {
    const llm =await getModel("router")
    const prompt = `You are a router agent that decides which agent to use based on the user's prompt.
    The available agents are:
    1. chat: for general conversation and questions.
    2. search: for searching the web for information.
    3. coding: for coding related queries and tasks.
    4. pdf: for processing and extracting information from PDF files.
    5. ppt: for processing and extracting information from PowerPoint files.
    6. vision: for image recognition and processing tasks.
    Return only the name of the agent to use in one word, without any additional text or explanation.
    user prompt: ${state.prompt}
    `
    const response = await llm.invoke(prompt)

    return {
        ...state,
        agent:response.content.trim().toLowerCase()

    }
}