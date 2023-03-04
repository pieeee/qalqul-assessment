import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/user.slice";
import registrationModalReducer from "./slices/registrationModal.slice";
import articleReducer from "./slices/article.slice";
import { loadState } from "./browser-storage";

const reducer = combineReducers({
  user: userReducer,
  registrationModalReducer,
  articleReducer,
});

export const store = configureStore({
  devTools: true,
  reducer,
  preloadedState: {
    user: loadState()?.user,
    articleReducer: loadState()?.articleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
