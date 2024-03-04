import type { PostForListDisplay } from "@/db/queries";

export interface Props {
  fetchData: () => Promise<PostForListDisplay[]>
}