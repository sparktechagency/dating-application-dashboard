import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notification",
      providesTags: ['notification']
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
