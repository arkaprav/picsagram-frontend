import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const CommentsApi = createApi({
    reducerPath: "Comments",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/comments",
    }),
    endpoints(builders){
        return {
            createComment: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "PostComments", id: data.postId }],
                query: ({ data, jwt, postId }) => {
                    return {
                        url: "/secure/",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        },
                        data
                    }
                }
            }),
            updateComment: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "PostComments", id: data.postId }, { type: "SingleComment", id: data.id }],
                query: ({ data, jwt, id, postId }) => {
                    return {
                        url: `/secure/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        },
                        data
                    }
                }
            }),
            deleteComment: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "PostComments", id: data.postId }, { type: "SingleComment", id: data.id }],
                query: ({ jwt, id, postId }) => {
                    return {
                        url: `/secure/${id}`,
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        },
                    }
                }
            }),
            updateLikeComment: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "PostComments", id: data.postId }, { type: "SingleComment", id: data.id}],
                query: ({ id, jwt, postId }) => {
                    return {
                        url: `/secure/likes/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    }
                }
            }),
            getAllPostComments: builders.query({
                providesTags: (res, err, data) => [{ type: "PostComments", id: data }],
                query: (id) => {
                    return {
                        url: `/post/${id}`,
                        method: "GET",
                    }
                }
            }),
            getSingleComment: builders.query({
                providesTags: (res, err, data) => [{ type: "SingleComment", id: data }],
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET",
                    }
                }
            })
        }
    }
});

export const { useCreateCommentMutation, useGetAllPostCommentsQuery, useGetSingleCommentQuery, useDeleteCommentMutation, useUpdateCommentMutation, useUpdateLikeCommentMutation } = CommentsApi;
export { CommentsApi };
