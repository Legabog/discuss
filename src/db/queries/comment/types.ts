import { Comment } from "@prisma/client";

export interface CommentForDisplay extends Comment {
  user: { name: string | null; image: string | null };
}
