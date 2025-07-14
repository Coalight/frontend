import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";

import authReducer from "./features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";
import coursesReducer from "./features/courses/coursesSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

const isDev = process.env.NODE_ENV !== "production";

// Combine all slices
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  courses: coursesReducer,
  dashboard: dashboardReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "ui", "courses", "dashboard"],
  version: 2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: isDev,
  });

export const store = makeStore();
export const persistor = persistStore(store);

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
