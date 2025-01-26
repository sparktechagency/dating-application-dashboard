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
            query : ()=>{
                return {
                    url : '/podcast/get-new-podcasts?page=1&limit=10',
                    method : 'GET'
                }
            }
        })

    })
})
export const { useGetAnalyticsQuery , useIncomeGrowthQuery , useSubscriptionGrowthQuery , useGetAllPodcastQuery} = dashboardApi;