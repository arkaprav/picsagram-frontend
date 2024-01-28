import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../customeBaseQuery/axiosBaseQuery";

const UsersApi = createApi({
    reducerPath: "Users",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://picsa-gram-backend.vercel.app/api/users/secure",
    }),
    endpoints(builders){
        return {
            getCurrentUser: builders.query({
                query: (jwt) => {
                    return {
                        url: "/current",
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                }
            }),
        }
    }
});

export const { useGetCurrentUserQuery } = UsersApi;
export { UsersApi };
