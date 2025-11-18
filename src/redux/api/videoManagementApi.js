import { baseApi } from "./baseApi";

const videoManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVideo: builder.query({
            query: () => {
                return {
                    url: `/home/get-video`,
                    method: 'GET'
                }
            },
            providesTags: ['videoManagement']
        }),

        uploadVideo: builder.mutation({
            query: (data) => {
                return {
                    url: '/home/upload-video',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['videoManagement']
        }),

        deleteVideo: builder.mutation({
            query: (id) => {
                return {
                    url: `/home/delete-video/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['videoManagement']
        })
    })
})

export const { useGetVideoQuery, useUploadVideoMutation, useDeleteVideoMutation } = videoManagementApi;
