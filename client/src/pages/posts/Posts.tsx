import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'reactstrap';
import Axios from 'axios';
import SinglePost from '../../components/single_post/SinglePost';
import './posts.css';
import { PostContext } from '../../context/PostContext';
import Subscribed from './Subscribed';

function Posts() {
    const [inputText, setInputText] = useState('');
    const { setPosts, updatedPosts } = useContext(PostContext);

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

    /*     const [state, setstate] = useState()
           // get all posts
           useEffect(() => {
            const config: any = {
                headers: {
                    'x-auth-token': `${storedToken}`,
                    'Content-Type': 'application/json',
                }
            }
            Axios.get('/api/posts/comment', config)
                .then((res) => setstate(res.data))
                .catch((err) => console.log(err));
        }, []);  */


    // get all posts
    useEffect(() => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        Axios.get('/api/posts/subscribedPost', config)
            .then((res) => console.log('subscribed',res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="center-post-div">
            <h3 className="write-post-title">Write post</h3>
            <form onSubmit={submitPost}>
                <Input
                    type="text"
                    className="input-post-text"
                    onChange={(e: any) => setInputText(e.target.value)}
                    placeholder="What is on your mind?"
                />
            </form>
            <div className="all-posts">
                <SinglePost updatedPosts={updatedPosts} />
            </div>
        </div>
    );
}

export default Posts;