import { z } from "zod";

// Schemas for form validation

export const PostSchema = z
  .object({
    title: z
      .string()
      .min(4, "Title must be at least 4 characters long")
      .max(40, "Title must not exceed 40 characters"),
    content: z
      .string()
      .min(40, "Content must be at least 40 characters long")
      .max(5000, "Content must not exceed 5000 characters"),
  })
  .required();

export const CommentSchema = z
  .object({
    content: z
      .string()
      .min(10, "Comment must be at least 10 characters long")
      .max(350, "Comment must not exceed 350 characters"),
  })
  .required();
