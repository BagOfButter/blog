import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Post, TAddCommentProps } from "./types";

const initialState: InitialState = {
  posts: [],
};

export const PostsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = payload;
    },
    setComment: (state, { payload }: PayloadAction<TAddCommentProps>) => {
      const { id, comment } = payload;
      const postIndex = state.posts.findIndex((post) => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push(comment);
      }
    },
  },
});

export const PostsActions = PostsSlice.actions;
export const PostsReducer = PostsSlice.reducer;
