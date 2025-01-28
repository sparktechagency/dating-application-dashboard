import { baseApi } from "./baseApi";

const administratorApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllAdministrator : builder.query({
            query : ({page , search})=>{
                return {
                    url : `/admin?search=${search}&page=${page}`,
                    method : 'GET'
                }
            },
            providesTags : ['administrator']            
        }),
        createAdministrator :  builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/create',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ['administrator']
        }),
        deleteAdministration : builder.mutation({
            query : (id)=>{
                return {
                    url :`/admin/remove/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['administrator']
        }),
        updateAdministrator :  builder.mutation({
            query : ({id, data})=>{
                return { 
                    url : `/admin/update/${id}`,
                    method : 'PUT',
                    body : data
                }
            },
            invalidatesTags : ['administrator']
        })
    })
})

export const { useGetAllAdministratorQuery  , useCreateAdministratorMutation , useDeleteAdministrationMutation , useUpdateAdministratorMutation} =  administratorApi;