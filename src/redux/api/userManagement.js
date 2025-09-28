import { baseApi } from "./baseApi";

const userManagement = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAllUser : builder.query({
            query : ({page , search , minAge , maxAge , gender , bodyType , ethnicity})=>{ 
                return {
                    url : `/user/get-all-users?page=${page}&search=${search}&minAge=${minAge}&maxAge=${maxAge}&gender=${gender}&bodyType=${bodyType}&ethnicity=${ethnicity}`,
                    method : 'GET'
                }
            },
            providesTags : ['userManagement']
        }),
        sendMessage : builder.mutation({
            query : (data)=>{
                return {
                    url : '/admin/send-message',
                    method : 'POST',
                    body : data
                }
            }
        }),
        blockUnblockUser : builder.mutation({
            query : (id)=>{
                return {
                    url : `/user/block/${id}`,
                    method : 'POST'
                }
            },
            invalidatesTags : ['userManagement']
        }),
        getSurvey : builder.query({
            query : (id)=>{
                return {
                    url : `/user/get_survey_feedback/${id}`,
                    method : 'GET'
                }
            }
        })
    })
})

export const  { useGetAllUserQuery , useSendMessageMutation , useBlockUnblockUserMutation , useGetSurveyQuery} = userManagement;