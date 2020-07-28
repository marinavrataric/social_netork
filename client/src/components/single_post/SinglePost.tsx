import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './singlePost.css';
import Axios from 'axios';
import { PostContext } from '../../context/PostContext';
import { AppContext } from '../../context/AppContext';
import { Input, Dropdown } from 'reactstrap';
import moment from 'moment';
import PostTime from './post-creation-time/PostTime';
import FirstThreeComments from './single_comment/FirstThreeComments';
import AllComments from './single_comment/AllComments';
import avatar from '../../assets/avatar.png'

interface Post {
    _id: string,
    content: string,
    registration_date: string,
    comments: [{
        id: string,
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
    },
    visibility: string
}

function SinglePost(props: any) {
    const [isShown, setIsShown] = useState(false)
    const [clickedPostId, setClickedPostId] = useState()
    const [dropdownValue, setdropdownValue] = useState('public')

    const { deletePost, likePost, unLikePost } = useContext(PostContext);
    const { userID } = useContext(AppContext)

    const storedToken = localStorage.getItem('token');
    const config = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }

    // create comment
    const createComment = (text: string, postId: string) => {
        const body = {
            postId: postId,
            text: text
        }
        Axios.put('/api/posts/comment', body, config)
    }

    // like post
    const handleLikePost = (postId: string) => {
        const body = {
            postId: postId
        }
        Axios.put('api/posts/like', body, config)
            .then(res => likePost(postId, res.data.likes))
    };

    // unlike post
    const unlikePost = (postId: string) => {
        const body = {
            postId: postId
        }
        Axios.put('api/posts/unlike', body, config)
            .then(res => unLikePost(postId, res.data.likes))
    };

    // delete post
    const handleDeletePost = (id: string) => {
        Axios.delete(`/api/posts/${id}`, config)
            .then(() => deletePost(id))
    };

    // show comments
    const showComments = (post: any) => {
        setIsShown(!isShown)
        setClickedPostId(post._id)
    }

    // visibility of post
    const setVisible = (id: string) => {
        const body = {
            postId: id,
            visibility: dropdownValue
        }
        Axios.put(`/api/posts/createPost/${id}`, body, config)
            .catch(err => console.log(err))
    }


    const [postid, setpostid] = useState('')

    return (
        <div className="all-posts">
            {props.updatedPosts && props.updatedPosts.map((post: Post) => {
                const dateNow = new Date()
                const startDate = moment(post.registration_date)
                const timeEnd = moment(dateNow)
                const diff = timeEnd.diff(startDate)
                const diffDuration = moment.duration(diff)

                return (
                    post && (
                        <div className="single-post-container" >
                            {/*delete post*/}
                            <div className="right-align">
                                <div className="dropdown">
                                    {post.userID._id === userID &&
                                        <Dropdown onClick={() => setVisible(post._id)}>
                                            {post.visibility === 'Public' ?
                                                <select
                                                    onClick={() => { setpostid(post._id); }}
                                                    value={dropdownValue}
                                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
                                                    <option value="Public">Public</option>
                                                    <option value="Private">Private</option>
                                                </select>
                                                :
                                                <select
                                                    onClick={() => { setpostid(post._id); }}
                                                    value={dropdownValue}
                                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setdropdownValue(e.target.value)}>
                                                    <option value="Private">Private</option>
                                                    <option value="Public">Public</option>
                                                </select>}
                                        </Dropdown>
                                    }
                                </div>
                                {post.userID._id === userID && <button
                                    className="btn btn-delete"
                                    onClick={() => {
                                        post._id && handleDeletePost(post._id);
                                    }}
                                ><i className="fa fa-remove" style={{ color: "red", fontSize: '20px' }}></i>
                                </button>}
                            </div>

                            <div className="left-align">
                                {/*post user info and time*/}
                                <div className="user-name-photo">
                                    <div className="img-circular-mini">
                                        <Link
                                            to={{
                                                pathname: `/userProfile/${post.userID._id}`,
                                                state: post.userID,
                                            }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="user-photo-mini"
                                                src={post.userID.profile_image === '' ? avatar : `http://localhost:5000/${post.userID.profile_image}`}
                                                alt='user profile img'
                                            ></img>
                                        </Link>
                                    </div>

                                    <div className="right-user-name-post">
                                        {post.userID && <p className="user-name-post">
                                            {post.userID.first_name} {post.userID.last_name}
                                        </p>}
                                        {PostTime(diffDuration.days(), diffDuration.hours(), diffDuration.minutes())}
                                    </div>
                                </div>

                                {/*post title*/}
                                <div className="user-post-text-container">
                                    <h2 className="user-post-text">{post.content}</h2>
                                </div>
                                <hr />

                            </div>
                            {/*like or dislike post*/}
                            <div className="buttons">
                                <p className="number-of-likes">
                                    {post.likes && post.likes.length} {post.likes && post.likes.length > 1 ? 'likes' : 'like'}
                                </p>
                                {post.likes && (post.likes.includes(userID))
                                    ?
                                    <button className="btn btn-like" onClick={() => unlikePost(post._id)}>
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    </button>
                                    :
                                    <button className="btn btn-like" onClick={() => handleLikePost(post._id)} >
                                        <i className="fa fa-thumbs-up" style={{ color: "gray" }} aria-hidden="true"></i>
                                    </button>
                                }
                                <button onClick={() => showComments(post)} className="btn-comment">
                                    {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
                                </button>
                            </div>

                            <hr />
                            {/*show comments*/}
                            <div className="comments-container">
                                {(isShown && post._id === clickedPostId) ? AllComments(post) : FirstThreeComments(post)}
                            </div>

                            {/*add new comment*/}
                            <form onSubmit={(e: any) => {
                                e.preventDefault()
                                createComment(e.target[0].value, post._id)
                                e.target[0].value = ''
                            }}>
                                <Input className="text-comment-input" placeholder='Add comment'></Input>
                            </form>
                        </div>
                    )
                );
            })}
        </div>
    );
}

export default SinglePost;