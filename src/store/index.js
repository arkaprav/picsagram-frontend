import { configureStore } from "@reduxjs/toolkit";
import { UsersAuthApi } from "./apis/UsersAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";
import { PostsApi } from "./apis/PostsApi";

const store = configureStore({
    reducer: {
        [UsersAuthApi.reducerPath]: UsersAuthApi.reducer,
        [UsersApi.reducerPath]: UsersApi.reducer,
        [PostsApi.reducerPath]: PostsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(UsersAuthApi.middleware)
        .concat(UsersApi.middleware)
        .concat(PostsApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useCreatePostMutation, useGetAllPostsQuery, useGetUserPostsQuery, useDeleteSinglePostMutation, useGetSinglePostQuery, useUpdateLikesMutation, useUpdateSinglePostMutation } from "./apis/PostsApi";
export { useLoginMutation, useRegisterMutation } from "./apis/UsersAuthApi";
export { useGetCurrentUserQuery, useUpdateUserMutation, useGetSingleUserMutation, useUpdateSavePostMutation } from "./apis/UsersApi";