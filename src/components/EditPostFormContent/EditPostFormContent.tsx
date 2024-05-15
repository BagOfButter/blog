"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/lib/schema";
import { Post } from "@/store/postsReducer/models/types";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { postsActions } from "@/store/postsReducer/models/actions";
import { selectPosts } from "@/store/postsReducer/models/selector";
import { availableTags } from "@/common/availableTags";
import {
  Container,
  ErrorText,
  FormTagsContainer,
  PostButton,
  TextAreaInput,
  TitleInput,
} from "@/common/commonStyles";

type PostFormInput = {
  title: string;
  content: string;
  tags: string[];
};

const EditPostFormContent = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>(post.tags);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    setValue,
  } = useForm<PostFormInput>({
    defaultValues: {
      title: post.title,
      content: post.content,
      tags: post.tags,
    },
    mode: "onSubmit",
    resolver: zodResolver(PostSchema),
  });

  // useEffect for getting selected tags

  useEffect(() => {
    setSelectedTags(post.tags);
  }, [post]);

  // Checks if post with same title exists

  const titleExists = async (posts: Post[], title: string, id: string) => {
    return posts.some((post) => post.title === title && post.id !== id);
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Form submit

  const onSubmit = async (data: PostFormInput) => {
    try {
      if (await titleExists(posts, data.title, post.id)) {
        throw new Error("Post with that title already exists");
      }
      dispatch(
        postsActions.EDIT_POST({
          id: post.id,
          title: data.title,
          content: data.content,
          tags: selectedTags,
        })
      );
      router.push("/");
    } catch (error) {
      if ((error as Error).message === "Post with that title already exists") {
        setError("title", { message: (error as Error).message });
      } else {
        console.error("Error editing post: ", error);
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div>
            <h2>Title:</h2>
            <Controller
              name="title"
              control={control}
              render={(props) => <TitleInput {...props.field} type="text" />}
            />
          </div>
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </label>

        <label>
          <div>
            <h2>Content:</h2>
            <Controller
              name="content"
              control={control}
              render={({ field }) => <TextAreaInput {...field} />}
            />
          </div>
          {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
        </label>
        <h2>Tags:</h2>
        <FormTagsContainer>
          {availableTags.map((tag) => (
            <div key={tag}>
              <label htmlFor={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            </div>
          ))}
        </FormTagsContainer>
        <PostButton type="submit">Edit</PostButton>
      </form>
    </Container>
  );
};

export default EditPostFormContent;
