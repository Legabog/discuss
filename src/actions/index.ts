'use server'

import * as auth from '@/auth'

export const signIn = async () => {
  return auth.signIn('github')
}
export const signOut = async () => {
  return auth.signOut()
}
export const createPost = async () => {
  // TODO: revalidate topic show page
}
export const createTopic = async () => {
  // TODO: revalidate home page

}
export const createComment = async () => {
  // TODO: revalidate post show page
}