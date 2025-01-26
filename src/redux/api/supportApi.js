import { baseApi } from "./baseApi";

const supportApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllSupportMessage : builder.query({
            query : ({page , name})=>{
                console.log(name);
                return {
                    url : `/support?page=${page}&name=${name}`,
                    method : 'GET'
                }
            },
            providesTags :['support']
        }),
        supportMessage : builder.mutation({
            query : ({id, data})=>{
                return {
                    url : `/support/reply/${id}`,
                    method : "POST",
                    body : data
                }
            },
            invalidatesTags : ['support']
        })
    })
})
export const { useGetAllSupportMessageQuery , useSupportMessageMutation } = supportApi