import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shyeyes-b.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Profile", "Friends", "Books", "ActiveUsers"],

  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "/book/get_books",
      providesTags: ["Books"],
    }),

    registerationStep1: builder.mutation({
      query: (registerData) => ({
        url: "/user/register/step1",
        method: "POST",
        body: registerData,
      }),
    }),

    otpVerification: builder.mutation({
      query: (otpDetails) => ({
        url: "/user/register/verify-otp",
        method: "POST",
        body: otpDetails,
      }),
    }),

    registerationStep2: builder.mutation({
      query: (personalDetail) => ({
        url: "/user/register/step2",
        method: "POST",
        body: personalDetail,
      }),
    }),

    loginUser: builder.mutation({
      query: (userdetails) => ({
        url: "/user/login",
        method: "POST",
        body: userdetails,
      }),
      invalidatesTags: ["User", "Profile", "Friends", "ActiveUsers"],
    }),

    GetProfileDetails: builder.query({
      query: () => "/user/matches",
      providesTags: ["Profile"],
    }),

    activeUsers: builder.query({
      query: () => "/user/active-users",
      providesTags: ["ActiveUsers"],
    }),

    sendFriendRequest: builder.mutation({
      query: (userId) => ({
        url: `/friends/${userId}/friend-request`,
        method: "POST",
      }),
      invalidatesTags: ["ActiveUsers", "Friends"],
    }),

    editProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: "/user/profile",
        method: "PUT",
        body: updatedProfile,
      }),
      invalidatesTags: ["Profile"],
    }),

    addPhotos: builder.mutation({
      query: (photos) => ({
        url: "/user/photos",
        method: "POST",
        body: photos,
      }),
      invalidatesTags: ["Profile"],
    }),

    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),

    getFriendProfile: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["Profile"],
    }),

    getUserFriendsList: builder.query({
      query: () => "/friends/list",
      providesTags: ["Friends"],
    }),

    likeprofile: builder.mutation({
      query: (userId) => ({
        url: `/likes/${userId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["ActiveUsers", "Profile"],
    }),

    setPhotoAsProfile: builder.mutation({
      query: (photoId) => ({
        url: `/user/photos/profile-pic`,
        method: "POST",
        body: {photo: photoId},
      }),
      invalidatesTags: ["Profile"],
    }),

    setPhotoAsCover: builder.mutation({
      query: (photoId) => ({
        url: `/user/set-cover-pic`,
        method: "PUT",
        body: {photo: photoId},
      }),
      invalidatesTags: ["Profile"],
    }),

    deletePhoto: builder.mutation({
      query: (photoId) => ({
        url: `/user/photo`,
        method: "DELETE",
        body: {photo: photoId},
      }),
      invalidatesTags: ["Profile"],
    }),

    searchUsers: builder.query({
      query: (term) => `/user/search?q=${encodeURIComponent(term)}`,
      providesTags: ["User"],
    }),

    likeUser: builder.mutation({
      query: (userId) => ({
        url: `/likes/${userId}/like`,
        method: "POST",
      }),
      // invalidatesTags: ["Profile", "ActiveUsers"],
      async onQueryStarted(userId, {dispatch, queryFulfilled}) {
        // Optimistic update: Directly change to store
        const pathResult = dispatch(
          usersApi.util.updateQueryData("activeUsers", undefined, (draft) => {
            const user = draft.data.users.find((user) => user._id === userId);
            if (user) {
              user.likedByMe = !user.likedByMe; // toggle like instantly
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          pathResult.undo();
        }
      },
    }),

    receiveLikes: builder.query({
      query: () => "/likes/received",
      providesTags: ["Profile"],
    }),

    unfriendFriend: builder.mutation({
      query: (friendId) => ({
        url: `/friends/unfriend/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"],
    }),

    blockFriend: builder.mutation({
      query: (friendId) => ({
        url: `/friends/${friendId}/block`,
        method: "POST",
      }),
      invalidatesTags: ["Friends"],
    }),

    getFriendRequests: builder.query({
      query: () => "/friends/requests",
      providesTags: ["Friends"],
    }),

    acceptFriendRequest: builder.mutation({
      query: (requestId) => ({
        url: `/friends/accept/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["Friends", "ActiveUsers"],
    }),

    rejectFriendRequest: builder.mutation({
      query: (requestId) => ({
        url: `/friends/reject/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["Friends", "ActiveUsers"],
    }),

    getBlockedFriends: builder.query({
      query: () => "/friends/block-list",
      providesTags: ["Friends"],
    }),

    fetchPlans: builder.query({
      query: () => "/plans",
      providesTags: ["Plans"],
    }),

    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/send",
        method: "POST",
        body,
      }),
    }),
    getMessages: builder.query({
      query: (friendId) => `/messages/${friendId}`,
    }),
    getConversations: builder.query({
      query: (userId) => `/conversations/${userId}`,
    }),

    getRemainingPlan: builder.query({
      query: () => "/plans/remaining",
      providesTags: ["Plans"],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useRegisterationStep1Mutation,
  useOtpVerificationMutation,
  useRegisterationStep2Mutation,
  useLoginUserMutation,
  useActiveUsersQuery,
  useSendFriendRequestMutation,
  useGetUserProfileQuery,
  useGetUserFriendsListQuery,
  useGetProfileDetailsQuery,
  useEditProfileMutation,
  useAddPhotosMutation,
  useLikeprofileMutation,
  useSetPhotoAsProfileMutation,
  useSetPhotoAsCoverMutation,
  useDeletePhotoMutation,
  useSearchUsersQuery,
  useLikeUserMutation,
  useGetFriendProfileQuery,
  useUnfriendFriendMutation,
  useBlockFriendMutation,
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,

  useReceiveLikesQuery,
  useFetchPlansQuery,
  useGetBlockedFriendsQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetConversationsQuery,
  useGetRemainingPlanQuery,
} = usersApi;
