import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_URL } from '../../../config.js'

// const token = localStorage.getItem('admin')
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
        }),
        getAdmin: builder.query({
            query: () => ({
                url: '/admin',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admin')}`
                }


            })
        })
    })
})

export const { useSigninAdminMutation, useGetAdminQuery } = AdminApi