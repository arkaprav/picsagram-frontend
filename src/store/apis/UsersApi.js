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
            getSingleUser: builders.mutation({
                providesTags: (res, err, data) => [{ type: "SingleUser", id: data }],
                query: (id) => {
                    return {
                        url: `/${id}`,
                        method: "GET"
                    }
                }
            }),
            getAllUsers: builders.query({
                providesTags: (res, err, data) => [{ type: "Users" }],
                query: () => {
                    return {
                        url: "/all",
                        method: "GET"
                    }
                }
            }),
            followUser: builders.mutation({
                invalidatesTags: (req, err, data) => [{ type: "SingleUser", id: data.id }, { type: "Users" }, { type: "User", jwt: data.jwt }],
                query: ({ jwt, id }) => {
                    return {
                        url: `/secure/follow/${id}`,
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    }
                }
            }),
            unFollowUser: builders.mutation({
                invalidatesTags: (req, err, data) => [{ type: "SingleUser", id: data.id }, { type: "Users" }, { type: "User", jwt: data.jwt }],
                query: ({ jwt, id }) => {
                    return {
                        url: `/secure/follow/${id}`,
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    }
                }
            }),
        }
    }
});

export const { useGetCurrentUserQuery, useUpdateUserMutation, useGetSingleUserMutation, useGetAllUsersQuery, useFollowUserMutation, useUnFollowUserMutation } = UsersApi;
export { UsersApi };
