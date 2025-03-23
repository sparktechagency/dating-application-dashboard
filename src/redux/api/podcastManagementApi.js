import { baseApi } from "./baseApi";

const podcastManagement = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllDonePodCast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast/get-done-podcasts?page=${page}`,
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
            invalidatesTags : ['padCastManagement']
        }),
        podcastDone : builder.mutation({
            query : (data)=>{
                return {
                    url : '/podcast/podcast-done',
                    method : 'POST',
                    body : data
                }
            },
            invalidatesTags : ['padCastManagement']
        })
    })
})

export const { useGetAllDonePodCastQuery , useSelectPodCastPartnerMutation , useSchedulePodCastMutation , usePodcastDoneMutation } = podcastManagement;