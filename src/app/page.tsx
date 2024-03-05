import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { PostList, TopicCreateForm, TopicList } from "@/components";
import { fetchTopPosts } from "@/db/queries";

const Home = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts}/>
      </div>
      <div>
        <Card className="py-4">
          <CardHeader className="block overflow-visible py-2">
            <TopicList />
          </CardHeader>
          <CardBody className="pb-0 justify-end">
            <TopicCreateForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default Home;
