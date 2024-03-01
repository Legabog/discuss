const paths = {
  home() {
    return '/'
  },
  topic(topicSlug: string, postId?: string) {
    const root = '/topics/'

    return {
      show: `${root}${topicSlug}`,
      edit: `${root}${topicSlug}/posts/new`,
      delete: `${root}${topicSlug}/posts/${postId}`,
    }
  },
}

export default paths;