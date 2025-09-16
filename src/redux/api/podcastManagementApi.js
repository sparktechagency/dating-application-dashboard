import { baseApi } from "./baseApi";

const podcastManagement = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllDonePodCast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast?status=done&page=${page}&limit=10`,
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
            },
            invalidatesTags : ['schedule']
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
        }),
        getPodcastRecording : builder.query({
            query : (id)=>{
                return {
                    url : `/podcast/record-get-podcast/${id}`,
                    method : 'GET'
                }
            }
        }),

        podcastRecordingDownload : builder.query({
            query : (url)=>{
                return {
                    url : `/podcast/download`,
                    method : 'POST',
                    body : url
                }
            }
        })

    })
})

export const { useGetAllDonePodCastQuery , useSelectPodCastPartnerMutation , useSchedulePodCastMutation , usePodcastDoneMutation , useGetPodcastRecordingQuery, usePodcastRecordingDownloadQuery } = podcastManagement;