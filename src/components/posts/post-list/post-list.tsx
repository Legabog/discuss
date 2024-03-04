import { FC } from 'react';
import Link from 'next/link';
// import type { Post, User, Topic } from '@prisma/client';

import paths from '@/path';
import { Props } from './types';

export const PostList:FC<Props> = async ({ fetchData }) => {
  const posts = await fetchData();

  const renderedPosts = posts.map(({ id, title, topic, user, _count }) => {
    const topicSlug = topic.slug;

    if (!topicSlug) throw new Error('Need a slug to link to a post');

    return (
      <div key={id} className="border rounded p-2">
        <Link href={paths.topic(topicSlug, id)['post-show']}>
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {user.name}</p>
            <p className="text-xs text-gray-400">
              {_count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
