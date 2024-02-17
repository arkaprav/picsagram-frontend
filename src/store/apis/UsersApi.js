import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const UsersApi = createApi({
    reducerPath: "Users",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/users",
    }),
    endpoints(builders){
        return {
            getCurrentUser: builders.query({
                providesTags: (res, err, jwt) => [{ type: "User", jwt }],
                query: (jwt) => {
                    return {
                        url: "/secure/current",
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                }
            }),
            updateUser: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "User", jwt: data.jwt }],
                query: ({ data, jwt }) => {
                    return {
                        url: "/secure/",
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                        data
                    }
                }
            }),
            updateSavePost: builders.mutation({
                invalidatesTags: (res, err, data) => [{ type: "Users" }, { type: "User", jwt: data.jwt }, { type: "Posts" }, { type: "SinglePost", id: data.id }],
                query: ({ id, jwt }) => {
                    return {
                        url: `/secure/save/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                }
            }),
            getSingleUser: builders.mutation({
                providesTags: (res, err, id) => [{ type: "SingleUser", id }],
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET"
                    }
                }
            }),
        }
    }
});

export const { useGetCurrentUserQuery, useUpdateUserMutation, useGetSingleUserMutation, useUpdateSavePostMutation } = UsersApi;
export { UsersApi };
