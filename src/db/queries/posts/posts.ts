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
export const fetchTopPosts = (): Promise<PostForListDisplay[]> => {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};
export const fetchSearchPosts = (
  term: string
): Promise<PostForListDisplay[]> => {
  return db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: term,
          }
        },
        {
          content: {
            contains: term,
          }
        },
      ],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
};
