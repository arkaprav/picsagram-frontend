import { configureStore } from "@reduxjs/toolkit";
import { UsersAuthApi } from "./apis/UsersAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersApi } from "./apis/UsersApi";

const store = configureStore({
    reducer: {
        [UsersAuthApi.reducerPath]: UsersAuthApi.reducer,
        [UsersApi.reducerPath]: UsersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(UsersAuthApi.middleware)
        .concat(UsersApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useLoginMutation, useRegisterMutation } from "./apis/UsersAuthApi";
export { useGetCurrentUserQuery, useUpdateUserMutation } from "./apis/UsersApi";