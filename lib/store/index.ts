import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/user.slice";
import registrationModalReducer from "./slices/registrationModal.slice";
import articleReducer from "./slices/article.slice";
import { loadState } from "./browser-storage";

export const reducer = combineReducers({
  user: userReducer,
  registration: registrationModalReducer,
  article: articleReducer,
});

export const store = configureStore({
  devTools: true,
  reducer,
  preloadedState: {
    user: loadState()?.user,
    article: loadState()?.article,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */
