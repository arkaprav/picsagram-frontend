import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const ReelsApi = createApi({
    reducerPath: "Reels",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/reels",
    }),
    endpoints(builders){
        return {
            createReel: builders.mutation({
                invalidatesTags: (res, err, data ) => [{ type: "Reels" }, { type: "UsersReels", id: data.id }],
                query: ({ data, jwt, id }) => {
                    return {
                        url: "/secure/",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                        data
                    }
                }
            }),
            getAllReels: builders.query({
                providesTags: (res, err, data) => [{ type: "Reels" }],
                query: () => {
                    return {
                        url: "/all",
                        method: "GET",
                    }
                }
            }),
            getUserReels: builders.query({
                providesTags: (res, err, data) => [{ type: "UsersReels", id: data }],
                query: (id) => {
                    return {
                        url: `/user/${id}`,
                        method: "GET",
                    }
                }
            }),
            deleteSingleReel: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Reels" }, { type: "UsersReels", id: data.userId }, { type: "SingleReel", id: data.id }],
                query: ({ id, jwt, userId }) => {
                    return {
                        url: `/secure/${id}`,
                        method: "DELETE",
                        headers:{
                            Authorization: `Bearer ${jwt}`
                        }
                    }
                }
            }),
            getSingleReel: builders.query({
                providesTags: (res, err, data) => [{ type: "SingleReel", id: data }],
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    }
                }
            }),
            updateLikesReels: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Reels" }, {type: "UsersReels" }, { type: "SingleReel", id: data.id }],
                query: ({ id, jwt }) => {
                    return {
                        url: `/secure/likes/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                }
            })
        }
    }
});

export const { useCreateReelMutation, useGetAllReelsQuery, useGetUserReelsQuery, useDeleteSingleReelMutation, useGetSingleReelQuery, useUpdateLikesReelsMutation } = ReelsApi;
export { ReelsApi };
