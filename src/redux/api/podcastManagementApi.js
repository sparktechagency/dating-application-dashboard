import { baseApi } from "./baseApi";

const podcastManagement = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllDonePodCast : builder.query({
            query : (page)=>{
                return {
                    url : `
                    `,
                    method : 'GET'
                }
            },
            providesTags : ['schedule']
        }),
        selectPodCastPartner : builder.mutation({
            query : (data)=>{
                return {
                    url : '/podcast/select-user',
                    method : 'POST',
                    body : data
                }
            }
        }),
        schedulePodCast : builder.mutation({
            query : (data)=>{
                return {
                    url : '/podcast/set-schedule',
                    method : "POST",
                    body : data
                }
            },
            invalidatesTags : ['schedule']
        })
    })
})

export const { useGetAllDonePodCastQuery , useSelectPodCastPartnerMutation , useSchedulePodCastMutation } = podcastManagement;