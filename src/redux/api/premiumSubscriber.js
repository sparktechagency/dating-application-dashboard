import { baseApi } from "./baseApi";

const premiumSubscriber = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getPremiumUsers : builder.query({
            query : ({page, search})=>{
                return {
                    url : `/user/get-all-premium-users?page=${page}&search=${search}`,
                    method : 'GET'
                }
            }
        })
    })
})

export const { useGetPremiumUsersQuery } = premiumSubscriber;