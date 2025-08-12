import img from '../../assets/images/placeholder.png'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    // baseUrl : 'http://10.10.20.11:8000',
    // baseUrl : 'http://10.10.20.11:8000',
    baseUrl : 'https://backend.podlove.co',
    prepareHeaders  :  (headers)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        if(token){
            headers.set('Authorization' , `Bearer ${token}`)
        }
        return headers
    }
})

export const baseApi = createApi({
    
    reducerPath : 'baseApi',
    baseQuery : baseQuery,
    tagTypes : ["padCastManagement"],
    endpoints : ()=>({})
})
// export const imageUrl = "http://10.10.20.11:8000"
export const imageUrl = "https://backend.podlove.co"

export const place = img;
