import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChatResponse } from '@/schemas/Chat.ts'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    editUsersPrompt: build.mutation<ChatResponse, string>({
      query: (prompt) => ({
        url: '/chat/editUsersPrompt',
        method: 'POST',
        body: { prompt },
      }),
      // transformResponse: (response: { data: ChatResponse }) => response.data,
    }),
  }),
})

export const { useEditUsersPromptMutation } = chatApi
