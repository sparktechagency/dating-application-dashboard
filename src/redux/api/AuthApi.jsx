import { baseApi } from "./baseApi";

const authApis = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        loginAdmin : builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/login',
                    method : 'POST',
                    body : data
                }
            }
        }),
        getAdminProfile : builder.query({
            query : ()=>{
                return{
                    url : '/admin/info',
                    method :'GET'
                }
            },
            providesTags : ['profile']
        }),
        updateAdminProfile : builder.mutation({
            query : (data)=>{
                return{
                    url : '/admin/update',
                    method : 'PUT',
                    body : data
                }
            },
            invalidatesTags : ['profile']
        }),
        changePassword :  builder.mutation({
            query : (data)=>{
                return {
                    url : "/auth/change-password",
                    method : 'PUT',
                    body : data
                }
            }
        })
    }) 
})

export const { useLoginAdminMutation , useChangePasswordMutation , useGetAdminProfileQuery , useUpdateAdminProfileMutation} = authApis;