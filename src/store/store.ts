import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice.ts'
import { chatApi } from '@/services/chat.ts'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
