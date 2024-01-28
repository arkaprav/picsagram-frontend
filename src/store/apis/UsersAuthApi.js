import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const UsersAuthApi = createApi({
    reducerPath: "UsersAuth",
    baseQuery: axiosBaseQuery({
        baseUrl: "http://localhost:5001/api/users/auth",
    }),
    endpoints(builders){
        return {
            Register: builders.mutation({
                query: (data) => {
                    return {
                        url: "/register",
                        method: "POST",
                        data
                    }
                }
            }),
            Login: builders.mutation({
                query: (data) => {
                    return {
                        url: "/login",
                        method: "POST",
                        data
                    }
                }
            })
        }
    }
});

export const { useLoginMutation, useRegisterMutation } = UsersAuthApi;
export { UsersAuthApi };
