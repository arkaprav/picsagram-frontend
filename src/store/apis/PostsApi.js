import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";
import { UsersApi } from "./UsersApi";

const PostsApi = createApi({
    reducerPath: "Posts",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/posts",
    }),
    endpoints(builders){
        return {
            createPost: builders.mutation({
                invalidatesTags: (res, err, data ) => [{ type: "Posts" }, { type: "UsersPosts", id: data.id }],
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
            updateSavePost: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Posts" }, { type: "SinglePost", id: data.id }],
                query: ({ id, jwt }) => {
                    return {
                        url: `/secure/save/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                },
                async onQueryStarted(
                    arg,
                    {
                        dispatch,
                        queryFulfilled,
                    }
                ) {
                    await queryFulfilled.then(() => {
                        dispatch(UsersApi.util.invalidateTags([{ type: "User", jwt: arg.jwt}, { type: "Users" }]));
                    });
                },
            }),
            getAllPosts: builders.query({
                providesTags: (res, err, data) => [{ type: "Posts" }],
                query: () => {
                    return {
                        url: "/all",
                        method: "GET",
                    }
                }
            }),
            getUserPosts: builders.query({
                providesTags: (res, err, data) => [{ type: "UsersPosts", id: data }],
                query: (id) => {
                    return {
                        url: `/user/${id}`,
                        method: "GET",
                    }
                }
            }),
            updateSinglePost: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "UsersPosts" }, { type: "Posts" }, { type: "SinglePost", id: data.id }],
                query: ({data, id, jwt}) => {
                    return {
                        url: `/secure/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                        data
                    }
                }
            }),
            deleteSinglePost: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Posts" }, { type: "UsersPosts", id: data.userId }, { type: "SinglePost", id: data.id }],
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
            getSinglePost: builders.query({
                providesTags: (res, err, data) => [{ type: "SinglePost", id: data }],
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    }
                }
            }),
            updateLikes: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Posts" }, {type: "UsersPosts" }, { type: "SinglePost", id: data.id }],
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

export const { useCreatePostMutation, useGetAllPostsQuery, useGetUserPostsQuery, useUpdateSavePostMutation, useDeleteSinglePostMutation, useGetSinglePostQuery, useUpdateLikesMutation, useUpdateSinglePostMutation } = PostsApi;
export { PostsApi };
