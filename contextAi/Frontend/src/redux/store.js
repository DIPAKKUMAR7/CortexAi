import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import consversationReducer  from "./conversationSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    consversation:consversationReducer
  },
})