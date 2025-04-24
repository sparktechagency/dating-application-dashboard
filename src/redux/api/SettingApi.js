import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllFaq  :  builder.query({
            query : ()=>{
                return {
                    url : '/faq',
                    method : 'GET'
                }
            },
            providesTags : ['FAQ']
        }),
        createFaq : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/faq/create',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ['FAQ']
        }),
        deleteFaq : builder.mutation({
            query : (id)=>{
                return {
                    url : `/faq/delete/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['FAQ']
        }),
        getTermsCondition :  builder.query({
            query : ()=>{
                return {
                    url : '/tac',
                    method : 'GET'
                }
            }
        }),
        getPrivacy :  builder.query({
            query : ()=>{
                return {
                    url : '/privacy',
                    method : 'GET'
                }
            }
        }),
        updateTerms : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/tac/update',
                    method : "PATCH",
                    body : data
                }
            }
        }),
        updatePrivacy : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/privacy/update',
                    method : "PATCH",
                    body : data
                }
            }
        }),
        getConsumerPolicy :  builder.query({
            query : ()=>{
                return {
                    url : '/consumer',
                    method : 'GET'
                }
            }
        }),
        updateConsumerPolicy : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/consumer/update',
                    method : "PATCH",
                    body : data
                }
            }
        }),
        getMediaPolicy :  builder.query({
            query : ()=>{
                return {
                    url : '/media',
                    method : 'GET'
                }
            }
        }),
        updateMediaPolicy : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/media/update',
                    method : "PATCH",
                    body : data
                }
            }
        }),
    })
})

export const { useGetAllFaqQuery , useCreateFaqMutation  , useDeleteFaqMutation, useGetTermsConditionQuery , useUpdateTermsMutation , useGetPrivacyQuery , useUpdatePrivacyMutation , useGetConsumerPolicyQuery , useUpdateConsumerPolicyMutation , useGetMediaPolicyQuery , useUpdateMediaPolicyMutation} = settingApi;