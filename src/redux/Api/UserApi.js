import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_URL } from '../../../config.js'
export const UserApi = createApi({
    reducerPath: 'userapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: '/auth',
                method: 'POST',
                body: data

            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/auth',
                method: 'GET'
            })
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/${id}`,
                method: 'PUT',
                body: data
            })
        })

    })
})

export const { useAddUserMutation, useGetUsersQuery, useUpdateUserMutation } = UserApi