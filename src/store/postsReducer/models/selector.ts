import { RootState } from "@/store/store";
import { Post } from "./types";

export const selectPosts = (state: RootState) => state.postsState.posts;

export const selectPostById =
  (postId: string) =>
  (state: RootState): Post | null => {
    return state.postsState.posts.find((post) => post.id === postId) || null;
  };
