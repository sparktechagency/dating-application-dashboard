import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAnalytics :  builder.query({
            query : ()=>{
                return {
                    url : "/analytics", 
                    method : 'GET'
                }
               
            }
        }),
        incomeGrowth : builder.query({
            query : (year)=>{
                return { 
                    url  : `/analytics/income/${year}`,
                    method : 'GET'
                }
            }
        }),
        subscriptionGrowth : builder.query({
            query : (year)=>{
                return {
                    url : `/analytics/subscription/${year}`,
                    method : 'GET'
                }
            }
        }),
        getAllPodcast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast/get-new-podcasts?page=&${page}&limit=10`,
                    method : 'GET'
                }
            },
            providesTags : ["padCastManagement"]
        }),
        getAllNewPodcast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast?status=upcoming&page=${page}&limit=40`,
                    method : 'GET'
                }
            },
            providesTags : ["padCastManagement"]
        })

    })
})
export const { useGetAnalyticsQuery , useIncomeGrowthQuery , useSubscriptionGrowthQuery , useGetAllPodcastQuery , useGetAllNewPodcastQuery} = dashboardApi;