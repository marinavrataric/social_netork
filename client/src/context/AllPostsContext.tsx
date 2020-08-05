import { createContext } from "react";

export const AllPostsContext = createContext({
   allPosts: [],
   likePost: (postID: string) => {},
   createPost: (text: string) => {},
   deletePost: (postID: string) => {},
   createComment: (text: string, commentID: string) => {},
   deleteComment: (commentID: string) => {},
   togglePostVisibility: (postID: string) => {}
})
