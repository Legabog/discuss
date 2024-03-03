import { FC } from "react";

import Link from "next/link";
import { Chip } from "@nextui-org/react";

import { db } from "@/db";
import paths from "@/path";

export const TopicList: FC = async () => {
  const topics = await db.topic.findMany();

  const renderTopics = topics.map(({ id, slug }) => {
    return (
      <div key={id}>
        <Link href={paths.topic(slug).show}>
          <Chip color="primary" variant="shadow">
            {slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return (
    <>
      <h4 className="font-bold text-large">Topics</h4>
      <div className="flex flex-row flex-wrap gap-2">{renderTopics}</div>
    </>
  );
};
