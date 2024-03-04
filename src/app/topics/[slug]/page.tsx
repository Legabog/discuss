import { FC } from "react";

import { PostCreateForm, PostList } from "@/components";
import { fetchPostsByTopicSlug } from "@/db/queries";
import { Props } from "./types";

const TopicShow: FC<Props> = ({ params }) => {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};
export default TopicShow;
