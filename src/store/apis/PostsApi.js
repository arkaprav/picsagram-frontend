import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const PostsApi = createApi({
    reducerPath: "Posts",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/posts",
    }),
    endpoints(builders){
        return {
            createPost: builders.mutation({
                providesTags: (res, err, data ) => [{ type: "Posts" }, { type: "UserPosts" }],
                query: ({ data, jwt }) => {
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
                providesTags: (res, err, data) => [{ type: "UsersPosts" }],
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
                invalidatesTags: (res, err, data) => [{ type: "Posts" }, { type: "UsersPosts" }, { type: "SinglePost", id: data.id }],
                query: ({ id, jwt }) => {
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
                        url: `/posts/${id}`,
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

export const { useCreatePostMutation, useGetAllPostsQuery, useGetUserPostsQuery, useDeleteSinglePostMutation, useGetSinglePostQuery, useUpdateLikesMutation, useUpdateSinglePostMutation } = PostsApi;
export { PostsApi };
