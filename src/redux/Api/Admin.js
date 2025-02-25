import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_URL } from '../../../config.js'


export const AdminApi = createApi({
    reducerPath: 'adminapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        signinAdmin: builder.mutation({
            query: (data) => ({
                url: '/admin/signin',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useSigninAdminMutation } = AdminApi