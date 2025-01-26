import { baseApi } from "./baseApi";

const podcastManagement = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllDonePodCast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast/get-done-podcasts?page=${page}`,
                    method : 'GET'
                }
            }
        }),
        selectPodCastPartner : builder.mutation({
            query : (data)=>{
                return {
                    url : '/podcast/select-user',
                    method : 'POST',
                    body : data
                }
            }
        })
    })
})

export const { useGetAllDonePodCastQuery , useSelectPodCastPartnerMutation } = podcastManagement;