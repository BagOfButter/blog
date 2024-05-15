"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/database/firebase";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/lib/schema";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectPostById } from "@/store/postsReducer/models/selector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { postsActions } from "@/store/postsReducer/models/actions";
import { useEffect } from "react";
import {
  PostTitle,
  PostContent,
  CommentForm,
  CommentList,
  CommentItem,
} from "./styled";
import {
  PostButton,
  TextAreaInput,
  Container,
  ErrorText,
} from "@/common/commonStyles";

type CommentFormInput = {
  content: string;
};

const PostDetail = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const post = useAppSelector(selectPostById(id));
  const [newComment, setNewComment] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CommentFormInput>({
    defaultValues: {
      content: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(CommentSchema),
  });

  // useEffect for fetching posts

  useEffect(() => {
    dispatch(postsActions.FETCH_POSTS({}));
  }, [dispatch]);

  // useEffect for updatin comments

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) => {
      setNewComment(!newComment);
    });
    return () => unsubscribe();
  });

  if (!post) {
    return <div>Loading...</div>;
  }

  // Handler for deleting posts

  const handleDeletePost = async () => {
    if (!post) return;
    try {
      dispatch(postsActions.DELETE_POST(id));
      router.push("/");
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Form submit

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    try {
      dispatch(
        postsActions.ADD_COMMENT({ id: post.id, comment: data.content })
      );
      reset();
      setNewComment(!newComment);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <Container>
      <PostTitle>{post.title}</PostTitle>
      <h4>Tags: {post.tags.join(", ")}</h4>
      <PostContent>{post.content}</PostContent>
      <Link href={`/${id}/edit`}>
        <PostButton>Edit post</PostButton>
      </Link>
      <PostButton onClick={handleDeletePost}>Delete post</PostButton>
      <h4>Comments:</h4>
      <CommentForm onSubmit={handleSubmit(onSubmit)}>
        <label>
          Write a comment:
          <div>
            <Controller
              name="content"
              control={control}
              render={({ field }) => <TextAreaInput {...field} />}
            />
          </div>
          {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
        </label>
        <PostButton type="submit">Comment</PostButton>
      </CommentForm>
      {post.comments.length > 0 && (
        <div>
          <CommentList>
            {post.comments.map((comment, index) => (
              <CommentItem key={index}>{comment}</CommentItem>
            ))}
          </CommentList>
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
