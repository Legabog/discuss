import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { TopicCreateForm, TopicList } from "@/components";

const Home = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
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
