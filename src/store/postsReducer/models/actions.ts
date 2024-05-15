import { PostsActions } from ".";
import { createAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./actionTypes";
import { TCreatePostProps, TEditPostProps, TAddCommentProps } from "./types";

export const postsActions = {
  FETCH_POSTS: createAction(ActionTypes.fetchPosts, (payload) => ({
    payload,
  })),
  DELETE_POST: createAction(ActionTypes.deletePost, (payload: string) => ({
    payload,
  })),
  CREATE_POST: createAction(
    ActionTypes.createPost,
    (payload: TCreatePostProps) => ({
      payload,
    })
  ),
  EDIT_POST: createAction(ActionTypes.editPost, (payload: TEditPostProps) => ({
    payload,
  })),
  ...PostsActions,
  ADD_COMMENT: createAction(
    ActionTypes.addComment,
    (payload: TAddCommentProps) => ({
      payload,
    })
  ),
  ...PostsActions,
};
