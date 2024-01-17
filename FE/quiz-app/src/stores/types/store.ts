import { configureStore } from "@reduxjs/toolkit";
import { playerDataReducer, playerRoomReducer } from "../slices/authSlices";

export const store = configureStore({
  reducer: {
    player: playerDataReducer,
    room: playerRoomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
