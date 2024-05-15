"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/store/postsReducer/models/types";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { postsActions } from "@/store/postsReducer/models/actions";
import { selectPosts } from "@/store/postsReducer/models/selector";
import { availableTags } from "@/common/availableTags";
import { PostItem, PostTitle, CheckboxInput, TagsContainer } from "./styled";
import { PostButton, Container } from "@/common/commonStyles";

const AllPosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // useEffect to fetch posts from the DB to state

  useEffect(() => {
    const loadPosts = async () => {
      try {
        dispatch(postsActions.FETCH_POSTS({}));
      } catch (error) {
        console.error("Error loading posts: ", error);
      }
    };

    loadPosts();
  }, [dispatch]);

  // Handler for filtering

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // useEffect for filtering

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      );
      setFilteredPosts(filtered);
    }
  }, [selectedTags, posts]);

  return (
    <Container>
      <Link href={"/create"}>
        <PostButton>Create new post</PostButton>
      </Link>
      <div>
        <h4>Filter by Tags:</h4>
        <TagsContainer>
          {availableTags.map((tag) => (
            <label key={tag}>
              <CheckboxInput
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagSelect(tag)}
              />
              {tag}
            </label>
          ))}
        </TagsContainer>
      </div>
      <div>
        {filteredPosts.map((post) => (
          <PostItem key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <p>
              {post.tags.length > 0
                ? `Tags: ${post.tags.join(", ")}`
                : "No tags"}
            </p>
            <Link href={`/${post.id}`}>
              <PostButton>View Details</PostButton>
            </Link>
          </PostItem>
        ))}
      </div>
    </Container>
  );
};

export default AllPosts;
