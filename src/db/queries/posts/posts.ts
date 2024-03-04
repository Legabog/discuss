import { db } from "@/db";
import { PostForListDisplay } from "./types";

export const fetchPostsByTopicSlug = (
  slug: string
): Promise<PostForListDisplay[]> => {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};
