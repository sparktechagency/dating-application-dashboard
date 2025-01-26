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
        })
    })
})

export const { useGetAllFaqQuery , useCreateFaqMutation } = settingApi;