import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => "/notification",
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
