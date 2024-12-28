
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://palli-bangla-server.vercel.app/api/v1" }),
  endpoints: () => ({}),
})