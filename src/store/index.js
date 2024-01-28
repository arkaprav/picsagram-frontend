import { configureStore } from "@reduxjs/toolkit";
import { UsersAuthApi } from "./apis/UsersAuthApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [UsersAuthApi.reducerPath]: UsersAuthApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(UsersAuthApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useLoginMutation, useRegisterMutation } from "./apis/UsersAuthApi";