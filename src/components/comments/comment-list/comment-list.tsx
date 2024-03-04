import { FC } from "react";
import { CommentShow } from "@/components";

import { fetchCommentsByPostId } from "@/db/queries";
import { Props } from "./types";

export const CommentList: FC<Props> = async ({ postId }) => {
  const comments = await fetchCommentsByPostId(postId)

  const topLevelComments = comments.filter(
    ({ parentId }) => parentId === null
  );
  const renderedComments = topLevelComments.map(({ id }) => {
    return (
      <CommentShow
        key={id}
        commentId={id}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
