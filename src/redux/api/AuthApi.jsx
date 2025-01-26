import { baseApi } from "./baseApi";

const authApis = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        loginAdmin : builder.mutation({
            query : (data)=>{
                return {
                    url : '/auth/login',
                    method : 'POST',
                    body : data
                }
            }
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

export const { useLoginAdminMutation , useChangePasswordMutation } = authApis;