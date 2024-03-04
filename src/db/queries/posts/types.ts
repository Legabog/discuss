import { Post } from "@prisma/client";

export interface PostForListDisplay extends Post {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
}
