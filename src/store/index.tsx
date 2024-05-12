import { SearchApi } from "@/services/search";
import { SongsApi } from "@/services/songs";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  [SearchApi.reducerPath]: SearchApi.reducer,
  [SongsApi.reducerPath]: SongsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: (arg0: {}) => any[]) =>
    getDefaultMiddleware({}).concat([
      SongsApi.middleware,
      SearchApi.middleware,
    ]),
});
