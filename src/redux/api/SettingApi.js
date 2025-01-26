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
                    method : "PUT",
                    body : data
                }
            }
        }),
        updatePrivacy : builder.mutation({
            query : (data)=>{
                return {
                    url  : '/privacy/update',
                    method : "PUT",
                    body : data
                }
            }
        })
    })
})

export const { useGetAllFaqQuery , useCreateFaqMutation  , useDeleteFaqMutation, useGetTermsConditionQuery , useUpdateTermsMutation , useGetPrivacyQuery , useUpdatePrivacyMutation} = settingApi;