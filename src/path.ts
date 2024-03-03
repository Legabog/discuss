const paths = {
  home() {
    return '/'
  },
  topic(topicSlug: string, postId?: string) {
    const root = '/topics/'

    return {
      show: `${root}${topicSlug}`,
      edit: `${root}${topicSlug}/posts/new`,
      'post-show': `${root}${topicSlug}/posts/${postId}`,
    }
  },
}

export default paths;