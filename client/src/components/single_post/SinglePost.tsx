import React, { useState, useEffect, useContext } from 'react';
import './singlePost.css';
import Axios from 'axios';
import { PostContext } from '../posts/PostContext';
import { AppContext } from '../context/AppContext';
import { Input } from 'reactstrap';
import moment from 'moment';

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



    const postTime = (day: number, hour: number, minute: number) => {
        if (hour !== 0 || day !== 0 || minute !== 0) {
            if (day >= 1) {
                if (day === 1) {
                    return <p className="post-time">{day} day ago</p>
                } else {
                    return <p className="post-time">{day} days ago</p>
                }
            } else if (hour >= 1) {
                if (hour === 1) {
                    return <p className="post-time">{hour} hour ago</p>
                } else {
                    return <p className="post-time">{hour} hours ago</p>
                }
            } else {
                if (minute === 1) {
                    return <p className="post-time">{minute} minute ago</p>
                } else {
                    return <p className="post-time">{minute} minutes ago</p>
                }
            }
        } else {
            return <p className="post-time">now</p>
        }
    }

    // show and hide comment
    const [isShown, setIsShown] = useState(false)
    const showComment = (post: any) => {
        if (isShown) {
            return post.comments.map((item: any) => {
                console.log(item)
                return (
                    <div className="comment-container">
                        <div className="img-comment-circular-mini">
                            <img src={item.userID.profile_image} className="user-photo-mini"></img>
                        </div>
                        <div className="comment-text-container">
                            <p className="text-bold">{item.userID.first_name} {item.userID.last_name}</p>
                            <p className="comment">{item.text}</p>
                        </div>
                    </div>
                )
            })
        } else {
            return post.comments.slice(0, 3).map((item: any) => {
                return (
                    <div className="comment-container">
                        <div className="img-comment-circular-mini">
                            <img src={item.userID.profile_image} className="user-photo-mini"></img>
                        </div>
                        <div className="comment-text-container">
                            <p className="text-bold">{item.userID.first_name} {item.userID.last_name}</p>
                            <p className="comment">{item.text}</p>
                        </div>
                    </div>
                )
            })
        }

    }

    return (
        <div className="all-posts">
            {props.updatedPosts.map((post: Post) => {
                const dateNow = new Date()
                const startDate = moment(post.registration_date)
                const timeEnd = moment(dateNow)
                const diff = timeEnd.diff(startDate)
                const diffDuration = moment.duration(diff)

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
                                    <i className="fa fa-remove" style={{color: "red"}}></i>
                                </button>
                            </div>

                            <div className="left-align">

                                <div className="user-name-photo">
                                    <div className="img-circular-mini">
                                        <img className="user-photo-mini" src={post.userID.profile_image}></img>
                                    </div>
                                    <div className="right-user-name-post">
                                        {post.userID && <p className="user-name-post">
                                            {post.userID.first_name} {post.userID.last_name}
                                        </p>}
                                        {postTime(diffDuration.days(), diffDuration.hours(), diffDuration.minutes())}
                                    </div>
                                </div>

                                <div className="user-post-text-container">
                                    <h2 className="user-post-text">{post.content}</h2>
                                </div>

                                <hr />

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
                                    <button onClick={() => setIsShown(!isShown)} className="btn-comment">
                                        {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
                                    </button>
                                </div>

                                <hr />

                                <div className="comments-container">{showComment(post)}</div>

                                <form onSubmit={(e: any) => {
                                    e.preventDefault()
                                    createComment(e.target[0].value, post._id)
                                    e.target[0].value = ''
                                }}>
                                    <Input className="text-comment-input" placeholder='Add comment'></Input>
                                </form>

                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
}

export default SinglePost;
