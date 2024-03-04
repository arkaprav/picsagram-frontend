import { configureStore } from "@reduxjs/toolkit";
import { UsersAuthApi } from "./apis/UsersAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";
import { PostsApi } from "./apis/PostsApi";
import { CommentsApi } from "./apis/CommentsApi";
import { ReelsApi } from "./apis/ReelsApi";

const store = configureStore({
    reducer: {
        [UsersAuthApi.reducerPath]: UsersAuthApi.reducer,
        [UsersApi.reducerPath]: UsersApi.reducer,
        [PostsApi.reducerPath]: PostsApi.reducer,
        [CommentsApi.reducerPath]: CommentsApi.reducer,
        [ReelsApi.reducerPath]: ReelsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(UsersAuthApi.middleware)
        .concat(UsersApi.middleware)
        .concat(PostsApi.middleware)
        .concat(ReelsApi.middleware)
        .concat(CommentsApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useCreatePostMutation, useGetAllPostsQuery, useGetUserPostsQuery, useUpdateSavePostMutation, useDeleteSinglePostMutation, useGetSinglePostQuery, useUpdateLikesMutation, useUpdateSinglePostMutation } from "./apis/PostsApi";
export { useLoginMutation, useRegisterMutation } from "./apis/UsersAuthApi";
export { useGetCurrentUserQuery, useUpdateUserMutation, useGetSingleUserMutation, useGetAllUsersQuery, useFollowUserMutation, useUnFollowUserMutation } from "./apis/UsersApi";
export { useCreateCommentMutation, useGetAllPostCommentsQuery, useGetSingleCommentQuery, useDeleteCommentMutation, useUpdateCommentMutation, useUpdateLikeCommentMutation } from "./apis/CommentsApi";
export { useCreateReelMutation, useGetAllReelsQuery, useGetUserReelsQuery, useDeleteSingleReelMutation, useGetSingleReelQuery, useUpdateLikesReelsMutation } from "./apis/ReelsApi";