import { FC } from "react";
import { redirect } from "next/navigation";

import { Props } from "./types";
import { PostList } from "@/components";
import { fetchSearchPosts } from "@/db/queries";

const SearchPage: FC<Props> = async ({ searchParams }) => {
  const { term } = searchParams;
  if (!term) redirect("/");

  return (
    <div>
      <PostList fetchData={() => fetchSearchPosts(term)} />
    </div>
  );
};
export default SearchPage;
