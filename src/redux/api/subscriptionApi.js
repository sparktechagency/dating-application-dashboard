import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllSubscription :  builder.query({
            query : ()=>{
                return {
                    url : '/subscription-plan/',
                    method : 'GET'
                }
            },
            providesTags : ['subscription']
        }),


        createSubscriptionPlan :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/subscription-plan/create',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ['subscription']
        }),


        updateSubscriptionPlan :  builder.mutation({
            query : ({id , data})=>{
                return {
                    url : `/subscription-plan/update/${id}`,
                    method : 'PUT',
                    body : data,
                }
            },
            invalidatesTags : ['subscription'] 
        }),

        deleteSubscriptionPlan:builder.mutation({
            query : (id)=>{
                return {
                    url : `/subscription-plan/delete/${id}`,
                    method : 'PUT'
                }
            },
            invalidatesTags : ['subscription']
        })
    })
})
export const { useGetAllSubscriptionQuery , useUpdateSubscriptionPlanMutation, useCreateSubscriptionPlanMutation, useDeleteSubscriptionPlanMutation } =  subscriptionApi;