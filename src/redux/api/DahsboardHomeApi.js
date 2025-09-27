import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getAnalytics :  builder.query({
            query : ()=>{
                return {
                    url : "/analytics", 
                    method : 'GET'
                }
               
            },
            providesTags : ['dashboard']
        }),
        incomeGrowth : builder.query({
            query : (year)=>{
                return { 
                    url  : `/analytics/income/${year}`,
                    method : 'GET'
                }
            },
            providesTags : ['dashboard']
        }),
        subscriptionGrowth : builder.query({
            query : (year)=>{
                return {
                    url : `/analytics/subscription/${year}`,
                    method : 'GET'
                }
            },
            providesTags : ['dashboard']
        }),
        getAllPodcast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast/get-new-podcasts?page=&${page}&limit=10`,
                    method : 'GET'
                }
            },
            providesTags : ["podcastManagement"]
        }),
        getAllNewPodcast : builder.query({
            query : (page)=>{
                return {
                    url : `/podcast?status=upcoming&page=${page}&limit=10`,
                    method : 'GET'
                }
            },
            providesTags : ["podcastManagement"]
        })

    })
})
export const { useGetAnalyticsQuery , useIncomeGrowthQuery , useSubscriptionGrowthQuery , useGetAllPodcastQuery , useGetAllNewPodcastQuery} = dashboardApi;