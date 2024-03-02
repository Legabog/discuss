"use server";

import type { Topic } from "@prisma/client";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import path from "@/path";
import * as auth from "@/auth";
import { CreateTopicFormState } from "./types";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { message: "Name must be lowercase" }),
  description: z.string().min(10),
});

export const signIn = async () => {
  return auth.signIn("github");
};
export const signOut = async () => {
  return auth.signOut();
};
export const createPost = async () => {
  // TODO: revalidate topic show page
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

  if (!session || !session.user)
    errors.errors._form = ["You muast be signed in to do this"];

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
export const createComment = async () => {
  // TODO: revalidate post show page
};
