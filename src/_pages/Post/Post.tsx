"use client";

import PostDetail from "@/components/PostDetail/PostDetail";

const Post = ({ id }: { id: string }) => {
  return <PostDetail id={id} />;
};

export default Post;
