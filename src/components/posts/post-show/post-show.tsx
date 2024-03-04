import { FC } from "react";

import { Props } from "./types";
import { db } from "@/db";
import { notFound } from "next/navigation";

export const PostShow: FC<Props> = async ({ postId }) => {
  const post = await db.post.findFirst({ where: { id: postId } });
  const { title, content } = post || {};

  if (!post) notFound();

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{title}</h1>
      <p className="p-4 border rounded">{content}</p>
    </div>
  );
};
