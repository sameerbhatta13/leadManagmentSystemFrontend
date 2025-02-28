import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { APP_URL } from '../../../config.js'


export const ServiceApi = createApi({
    reducerPath: 'serviceapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        addService: builder.mutation({
            query: (data) => ({
                url: '/service',
                method: 'POST',
                body: data
            })
        }),
        getService: builder.query({
            query: () => ({
                url: '/service',
                method: 'GET'
            })
        })
    })
})

export const { useAddServiceMutation, useGetServiceQuery } = ServiceApi