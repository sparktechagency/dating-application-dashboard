import img from '../../assets/images/placeholder.png'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl : 'http://10.10.10.59:8000',
    // baseUrl : 'http://10.0.60.118:5050',
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
// export const imageUrl = "http://10.0.60.118:5050"
export const imageUrl = "http://http://10.10.10.59:8000"

export const place = img;
