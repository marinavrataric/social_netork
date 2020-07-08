import React, { useState, useEffect, useContext } from 'react';
import './singlePost.css';
import Axios from 'axios';
import { PostContext } from '../posts/PostContext';
import { AppContext } from '../context/AppContext';
import { Input } from 'reactstrap';

interface Post {
    _id: string,
    content: string,
    registration_date: string,
    comments: [{
        text: string,
        userID: {
            first_name: string,
            last_name: string,
            profile_image: string,
            _id: string
        }
    }],
    likes: [string],
    userID: {
        first_name: string,
        last_name: string,
        profile_image: string,
        _id: string
    }
}

function SinglePost(props: any) {
    const [userInfoData, setuserInfoData] = useState({
        firstName: '',
        lastName: '',
    });

    const { deletePost, likePost } = useContext(PostContext);
    const { userID } = useContext(AppContext)

    const storedToken = localStorage.getItem('token');

    // like post
    const handleLikePost = (postId: string, userID: string) => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        const body = {
            postId: postId
        }
        Axios.put('api/posts/like', body, config)
            .then(res => {
                //console.log('like response', res.data.likes)
                likePost(postId, res.data.likes)
            })
            .catch(err => console.log(err))
    };

    // unlike post
    const unlikePost = (id: any) => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        const body = {
            postId: id
        }
        Axios.put('api/posts/unlike', body, config)
            .then(res => console.log('unlike response', res))
            .catch(err => console.log(err))
    };

    // delete post
    const handleDeletePost = (id: string) => {
        const config = {
            headers: { 'x-auth-token': `${storedToken}` },
        };
        Axios.delete(`/api/posts/${id}`, config)
            .then((res) => {
                //console.log('deleted post',res.data);
                deletePost(id);
            })
            .catch((err) => console.log(err));
    };

    // get user data
    useEffect(() => {
        const config = {
            headers: { 'x-auth-token': `${storedToken}` },
        };
        Axios.get('/api/auth/user', config)
            .then((res) => {
                setuserInfoData({
                    firstName: res.data.user.first_name,
                    lastName: res.data.user.last_name,
                });
            })
            .catch((err) => console.log(err));
    }, [storedToken]);

    // create comment
    const createComment = (text: string, postId: string) => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        const body = {
            postId: postId,
            text: text
        }
        Axios.put('/api/posts/comment', body, config)
            .then(res => {
                //console.log('created comment', res.data.comments)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {props.updatedPosts.map((post: Post) => {
                return (
                    post && (
                        <div className="single-post-container" key={post._id}>
                            <div className="right-align">
                                <button
                                    className="btn btn-delete"
                                    onClick={() => {
                                        post._id && handleDeletePost(post._id);
                                    }}
                                >
                                    <i className="fa fa-remove"></i>
                                </button>
                            </div>
                            <div className="left-align">
                                <p className="user-name-post">
                                    {post.userID && <p>{post.userID.first_name} {post.userID.last_name}</p>}
                                </p>
                                <h2 className="user-post">{post.content}</h2>
                                <div className="buttons">
                                    <p className="number-of-likes">
                                        {post.likes && post.likes.length} {post.likes && post.likes.length > 1 ? 'likes' : 'like'}
                                    </p>
                                    {post.likes && (post.likes.includes(userID))
                                        ?
                                        <button className="btn btn-like" onClick={() => unlikePost(post._id)}>
                                            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                                        </button>
                                        :
                                        <button className="btn btn-like" onClick={() => handleLikePost(post._id, userID)} >
                                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                        </button>
                                    }
                                    {post.comments &&
                                        post.comments.map((item: any) => {
                                            return (
                                                <p className="comment">{item.userID.first_name} {item.userID.last_name}: {item.text}</p>
                                            )
                                        })
                                    }
                                    <form onSubmit={(e: any) => {
                                        e.preventDefault()
                                        createComment(e.target[0].value, post._id)
                                        e.target[0].value = ''
                                    }}>
                                        <Input className="text-comment" placeholder='Add comment...'></Input>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
}

export default SinglePost;
