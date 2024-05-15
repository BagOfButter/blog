"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import EditPostFormContent from "../EditPostFormContent/EditPostFormContent";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectPostById } from "@/store/postsReducer/models/selector";
import { useEffect } from "react";
import { postsActions } from "@/store/postsReducer/models/actions";

// Form base component

const EditPostForm = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostById(id));

  useEffect(() => {
    dispatch(postsActions.FETCH_POSTS({}));
  }, [dispatch]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return <EditPostFormContent post={post} />;
};

export default EditPostForm;
