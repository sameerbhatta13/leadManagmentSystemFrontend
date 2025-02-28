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
        }),
        updateService: builder.mutation({
            query: (id, data) => ({
                url: `service/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: 'DELETE'
            })

        })
    })
})

export const { useAddServiceMutation, useGetServiceQuery, useUpdateServiceMutation } = ServiceApi