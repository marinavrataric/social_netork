import React, { useState, useEffect, useContext } from 'react';
import { Button, Input } from 'reactstrap';
import Axios from 'axios';
import SinglePost from '../single_post/SinglePost';
import { AppContext } from '../context/AppContext';
import './posts.css';
import { PostContext } from './PostContext';

function Posts() {
    const [inputText, setInputText] = useState('');
    const { setPosts, allPosts } = useContext(PostContext);

    const storedToken = localStorage.getItem('token');
    const config: any = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        },
    };

    // create post
    const submitPost = (e: any) => {
        e.preventDefault();
        const postData = {
            content: inputText,
        };
        Axios.post('/api/posts', postData, config)
            .then((res) => {
                console.log('Created post: ', res.data);
                const item: {
                    content: string;
                    _id: string;
                } = res.data;
                setPosts(item.content, item._id);
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="center-post-div">
            <input
                type="text"
                className="input-post-text"
                onChange={(e: any) => setInputText(e.target.value)}
                placeholder="What is on your mind?"
            />
            <button onClick={submitPost} className="btn-submit-post">
                Submit
            </button>
            <div className="all-posts">
                <p className="title-post">Recently posted</p>
                <SinglePost />
            </div>
        </div>
    );
}

export default Posts;
