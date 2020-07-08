import { createContext } from 'react';

interface PostContextProps {
    allPosts: Array<{ content: string; _id?: string | undefined, registration_date?: string, likes?: [], userID?: string }>;
    setPosts: (inputText: string, id: string, registration_date: string, likes: []) => void;
    deletePost: (postId: string) => void;
    likePost: (postId: string, likes: []) => void,
    updatedPosts: any
}

export const PostContext = createContext<PostContextProps>({
    allPosts: [{ content: '', _id: '', registration_date: '', likes: [], userID: '' }],
    setPosts: (inputText: string, id: string, registration_date: string, likes: []) => {},
    deletePost: (postId: string) => {},
    likePost: (postId: string, likes: []) => {},
    updatedPosts: []
});
