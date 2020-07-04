import { createContext } from "react";

export const PostContext = createContext({
    allPosts: [],
    setAllPosts: (allPosts: []) => {},
    setPosts: (posts: []) => {}
})
