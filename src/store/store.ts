import { configureStore, combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "../features/employees/employeeSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the localStorage object
  storage,
  whitelist: ["employees"], // Only persist the employees slice
};

// Combine reducers if you have more slices, although with one slice it's simple
const rootReducer = combineReducers({
  employees: employeeReducer,
  // Add other reducers here if needed
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Middleware to ignore actions dispatched by redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
