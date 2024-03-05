import { FC, Suspense } from "react";
import Link from "next/link";

import {CommentCreateForm, PostShow, CommentList, PostShowLoading} from "@/components";
import paths from "@/path";
import { Props } from "./types";

const PostShowPage: FC<Props> = ({ params }) => {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topic(slug).show}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading/>}>
      <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
export default PostShowPage;