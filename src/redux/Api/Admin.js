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
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'admin/reset',
                method: 'POST',
                body: data

            })

        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/verify',
                method: 'POST',
                body: data
            })

        }),
        updateAdmin: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/${id}`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useSigninAdminMutation, useGetAdminQuery, useResetPasswordMutation, useVerifyOtpMutation, useUpdateAdminMutation } = AdminApi