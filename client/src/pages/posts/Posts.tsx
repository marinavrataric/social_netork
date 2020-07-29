import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'reactstrap';
import Axios from 'axios';
import SinglePost from '../../components/single_post/SinglePost';
import './posts.css';
import { PostContext } from '../../context/PostContext';
import { AppContext } from '../../context/AppContext';
import moment from 'moment';
import { PostInterface } from '../../interfaces/PostInterface';

function Posts() {
    const [inputText, setInputText] = useState('');
    const { setPosts, updatedPosts } = useContext(PostContext);
    const { userID } = useContext(AppContext)

    const storedToken = localStorage.getItem('token');
    const config: any = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json'
        }
    };

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

    const [postsArray, setPostsArray] = useState([])
    // get all posts
    useEffect(() => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        Axios.get('/api/posts/comment', config)
            .then((res) => setPostsArray(res.data))
            .catch((err) => console.log(err));
    }, []);

    const publicPosts = postsArray?.filter((post: any) => {
        if (post.visibility === 'Public') return post
    });

    const postsPrivate = postsArray?.filter((post: any) => {
        if (post.visibility === 'Private') return post
    })

    const dateNow = new Date()

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
            <div className="all-posts">
                {updatedPosts.map((post: PostInterface) => {
                    const startDate = moment(post.registration_date)
                    const timeEnd = moment(dateNow)
                    const diff = timeEnd.diff(startDate)
                    const diffDuration = moment.duration(diff)
                    return <SinglePost post={post} diffDuration={diffDuration}/>
                }
                )}
            </div>
        </div>
    );
}

export default Posts;