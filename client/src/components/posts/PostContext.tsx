import { createContext } from 'react';

interface PostContextProps {
    allPosts: Array<{ content: string; _id?: string | undefined }>;
    setPosts: (inputText: string, id: string) => void;
    deletePost: (postId: string) => void;
}

export const PostContext = createContext<PostContextProps>({
    allPosts: [{ content: '', _id: '' }],
    setPosts: (inputText: string, id: string) => {},
    deletePost: (postId: string) => {}
});
