"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { postsActions } from "@/store/postsReducer/models/actions";
import { selectPosts } from "@/store/postsReducer/models/selector";
import { Post } from "@/store/postsReducer/models/types";
import { availableTags } from "@/common/availableTags";
import {
  TitleInput,
  PostButton,
  TextAreaInput,
  Container,
  ErrorText,
  FormTagsContainer,
} from "@/common/commonStyles";

type PostFormInput = {
  title: string;
  content: string;
  tags: string[];
};

// React hook form with zod validation

const CreatePostForm = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PostFormInput>({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
    mode: "onSubmit",
    resolver: zodResolver(PostSchema),
  });

  // Handler for changing tags in form

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Checks if there is already post with that title

  const titleExists = async (posts: Post[], title: string) => {
    return posts.some((post) => post.title === title);
  };

  // Form submit

  const onSubmit: SubmitHandler<PostFormInput> = async (data) => {
    try {
      if (await titleExists(posts, data.title)) {
        throw new Error("Post with that title already exists");
      }
      dispatch(
        postsActions.CREATE_POST({
          title: data.title,
          content: data.content,
          tags: selectedTags,
          comments: [],
        })
      );
      router.push("/");
    } catch (error) {
      if ((error as Error).message === "Post with that title already exists") {
        setError("title", { message: (error as Error).message });
      }
      console.log((error as Error).message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <h2>Title:</h2>
          <div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <TitleInput {...field} type="text" />}
            />
          </div>
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </label>
        <label>
          <h2>Content:</h2>
          <div>
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
          {availableTags.map((tag: string) => (
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
        <PostButton type="submit">Post</PostButton>
      </form>
    </Container>
  );
};

export default CreatePostForm;
