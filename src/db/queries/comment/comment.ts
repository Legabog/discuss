import { cache } from "react";
import { db } from "@/db";
import { CommentForDisplay } from "./types";

export const fetchCommentsByPostId = cache((
  postId: string
): Promise<CommentForDisplay[]> => {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
})
