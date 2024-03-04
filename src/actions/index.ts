"use server";

import type { Topic, Post, Comment } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import path from "@/path";
import * as auth from "@/auth";
import { CreateTopicFormState, CreatePostFormState, CreateCommentFormState } from "./types";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { message: "Name must be lowercase" }),
  description: z.string().min(10),
});
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
const createCommentSchema = z.object({
  content: z.string().min(3),
});

export const signIn = async () => {
  return auth.signIn("github");
};
export const signOut = async () => {
  return auth.signOut();
};
export const createPost = async (
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  const errors: CreatePostFormState = {
    errors: {},
  };

  if (!result.success) errors.errors = result.error.flatten().fieldErrors;

  const session = await auth.auth();

  if (!session || !session.user) {
    errors.errors._form = ["You muast be signed in to do this"];
    return errors;
  }

  let post = {} as Post;
  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });
  if (!topic) errors.errors._form = ["Topic not found"];
  if (result.success && topic && session && session.user) {
    try {
      post = await db.post.create({
        data: {
          title: result.data.title,
          content: result.data.content,
          topicId: topic.id,
          userId: session.user.id,
        },
      });
    } catch (err: unknown) {
      errors.errors._form = [
        err instanceof Error ? err.message : "Failed to create post",
      ];
    }
  }

  revalidatePath(path.topic(slug).show);
  redirect(path.topic(slug, post.id)["post-show"]);

  return errors;
};
export const createTopic = async (
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> => {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  const errors: CreateTopicFormState = {
    errors: {},
  };

  if (!result.success) errors.errors = result.error.flatten().fieldErrors;

  const session = await auth.auth();

  if (!session || !session.user) {
    errors.errors._form = ["You muast be signed in to do this"];
    return errors;
  }

  let topic = {} as Topic;
  if (result.success) {
    try {
      topic = await db.topic.create({
        data: { slug: result.data.name, description: result.data.description },
      });
    } catch (err: unknown) {
      errors.errors._form = [
        err instanceof Error ? err.message : "Something went wrong",
      ];
    }
  }

  revalidatePath("/");
  redirect(path.topic(topic.slug).show);

  return errors;
};
export const createComment = async ({ postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData): Promise<CreateCommentFormState> => {
    const result = createCommentSchema.safeParse({
      content: formData.get("content"),
    });
    const errors: CreateCommentFormState = {
      errors: {},
    };

    if (!result.success) errors.errors = result.error.flatten().fieldErrors;
  
    const session = await auth.auth();
    if (!session || !session.user) {
      errors.errors._form = ["You muast be signed in to do this"];
      return errors;
    }

    if (result.success) {
      try {
        await db.comment.create({
          data: {
            content: result.data.content,
            postId: postId,
            parentId: parentId,
            userId: session.user.id,
          },
        });
      } catch (err: unknown) {
        errors.errors._form = [
          err instanceof Error ? err.message : "Something went wrong",
        ];
      }
    } 
  
    const topic = await db.topic.findFirst({
      where: { posts: { some: { id: postId } } },
    });
  
    if (!topic) errors.errors._form = ["Failed to revalidate topic"]
    else revalidatePath(path.topic(topic.slug, postId)["post-show"]);

    errors.success = true;
    return errors
};
