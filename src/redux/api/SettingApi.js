import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaq: builder.query({
            query: () => {
                return {
                    url: '/faq',
                    method: 'GET'
                }
            },
            providesTags: ['legal']
        }),
        createFaq: builder.mutation({
            query: (data) => {
                return {
                    url: '/faq/create',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['legal']
        }),
        deleteFaq: builder.mutation({
            query: (id) => {
                return {
                    url: `/faq/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['legal']
        }),
        getTermsCondition: builder.query({
            query: () => {
                return {
                    url: '/tac',
                    method: 'GET'
                }
            },
             providesTags : ['legal']
        }),
        getPrivacy: builder.query({
            query: () => {
                return {
                    url: '/privacy',
                    method: 'GET'
                }
            },
             providesTags : ['legal']
        }),
        updateTerms: builder.mutation({
            query: (data) => {
                return {
                    url: '/tac/update',
                    method: "PATCH",
                    body: data
                }
            },
             invalidatesTags : ['legal']
        }),
        updatePrivacy: builder.mutation({
            query: (data) => {
                return {
                    url: '/privacy/update',
                    method: "PATCH",
                    body: data
                }
            },
             invalidatesTags : ['legal']
        }),
        getConsumerPolicy: builder.query({
            query: () => {
                return {
                    url: '/consumer',
                    method: 'GET'
                }
            },
             providesTags : ['legal']
        }),
        updateConsumerPolicy: builder.mutation({
            query: (data) => {
                return {
                    url: '/consumer/update',
                    method: "PATCH",
                    body: data
                }
            },
             invalidatesTags : ['legal']
        }),


        getMediaPolicy: builder.query({
            query: () => {
                return {
                    url: '/home/get-media-policy',
                    method: 'GET'
                }
            },
            providesTags: ['legal']
        }),
        updateMediaPolicy: builder.mutation({
            query: (data) => {
                return {
                    url: '/home/update-media-policy',
                    method: "PATCH",
                    body: data
                }
            },
            invalidatesTags: ['legal']
        }),


        getSmsPolicy: builder.query({
            query: () => {
                return {
                    url: '/home/get-sms-policy',
                    method: 'GET'
                }
            },
             providesTags : ['legal']
        }),
        updateSmsPolicy: builder.mutation({
            query: (data) => {
                return {
                    url: '/home/update-sms-policy',
                    method: "PATCH",
                    body: data
                }
            },
             invalidatesTags : ['legal']
        }),
    })
})

export const { useGetAllFaqQuery, useCreateFaqMutation, useDeleteFaqMutation, useGetTermsConditionQuery, useUpdateTermsMutation, useGetPrivacyQuery, useUpdatePrivacyMutation, useGetConsumerPolicyQuery, useUpdateConsumerPolicyMutation, useGetMediaPolicyQuery, useUpdateMediaPolicyMutation, useGetSmsPolicyQuery, useUpdateSmsPolicyMutation } = settingApi;