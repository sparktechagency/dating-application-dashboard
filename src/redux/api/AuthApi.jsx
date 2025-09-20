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
                    url : "/admin/change-password",
                    method : 'POST',
                    body : data
                }
            }
        }),
        forgetPassword :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/recovery',
                    method :'POST',
                    body : data
                }
            }
        }),
        verifyEmail : builder.mutation({
            query : (data)=>{
                return { 
                    url : "/admin/recovery-verification",
                    method :"POST",
                    body : data
                }
            }
        }),
        resetPassword : builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/reset-password',
                    method : 'POST',
                    body : data,
                }
            }
        })
    }) 
})

export const { useLoginAdminMutation , useChangePasswordMutation , useGetAdminProfileQuery , useUpdateAdminProfileMutation , useForgetPasswordMutation , useVerifyEmailMutation , useResetPasswordMutation} = authApis;