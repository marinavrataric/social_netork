import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'reactstrap';
import Axios from 'axios';
import SinglePost from '../../components/single_post/SinglePost';
import './posts.css';
import { PostContext } from '../../context/PostContext';
import moment from 'moment';
import { PostInterface } from '../../interfaces/PostInterface';
import { config } from '../../constants/generalConstants';
import { AppContext } from '../../context/AppContext';

function Posts() {
    const [inputText, setInputText] = useState('');
    const { setPosts, updatedPosts } = useContext(PostContext);
    const { userID } = useContext(AppContext)

    const dateNow = new Date()

    // create post
    const submitPost = (e: any) => {
        e.preventDefault()
        const postData = {
            content: inputText
        }
        Axios.post('/api/posts', postData, config)
            .then((res) => {
                const item: {
                    content: string;
                    _id: string;
                    registration_date: string,
                    likes: []
                } = res.data;
                setPosts(item.content, item._id, item.registration_date, item.likes);
            })
            .catch((err) => console.log(err));

        e.target[0].value = ''
    };

    // get all posts (all public and followings posts)
    const [postsArray, setPostsArray] = useState<PostInterface[]>([])
    useEffect(() => {
        Axios.get('/api/posts/comment', config)
            .then((res) => setPostsArray(res.data))
            .catch((err) => console.log(err));
    }, []);

    const withoutCurrentUser = postsArray?.filter((post: PostInterface) => (post.userID && post.userID._id !== userID))

    const availablePosts = withoutCurrentUser?.reduce((acc: PostInterface[], post) => {
        if (post.userID.followers && post.userID.followers.some(follower => follower === userID)) {
            acc.push(post);
        }
        else if (post.visibility === 'Public') acc.push(post)
        return acc;
    }, []);

    return (
        <div className="center-post-div">
            <form onSubmit={submitPost}>
                <Input
                    type="text"
                    className="input-post-text"
                    onChange={(e: any) => setInputText(e.target.value)}
                    placeholder="What is on your mind?"
                />
            </form>
            <div>HELLO</div>
            <div className="all-posts">
                {availablePosts?.map((post: PostInterface) => {
                    const startDate = moment(post.registration_date)
                    const timeEnd = moment(dateNow)
                    const diff = timeEnd.diff(startDate)
                    const diffDuration = moment.duration(diff)
                    return <SinglePost post={post} diffDuration={diffDuration} />
                }
                )}
            </div>
        </div>
    );
}

export default Posts;