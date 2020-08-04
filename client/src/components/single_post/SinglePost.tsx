import React, { useState, useContext } from 'react';
import './singlePost.css';
import Axios from 'axios';
import { PostContext } from '../../context/PostContext';
import { AppContext } from '../../context/AppContext';
import { Input } from 'reactstrap';
import PostTime from './post-creation-time/PostTime';
import FirstThreeComments from '../comments/FirstThreeComments';
import AllComments from '../comments/AllComments';
import { config } from '../../constants/generalConstants';
import DropdownPostOptions from '../dropdown/DropdownPostOptions';
import UserInfoComment from '../user_info_comment/UserInfoComment';
import CommentsButtons from '../comment_buttons/CommentsButtons';

function SinglePost({ post, diffDuration }: any) {
    const [isShown, setIsShown] = useState(false)
    const [clickedPostId, setClickedPostId] = useState()
    const [dropdownValue, setdropdownValue] = useState('public')

    const { deletePost, likePost, unLikePost } = useContext(PostContext);
    const { userID } = useContext(AppContext)

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

    //console.log(post)

    return (
        <div className="all-posts">
            <div className="single-post-container" >
                <div className='row-info'>
                    <div className="left-align-user">
                        <UserInfoComment post={post} PostTime={PostTime} diffDuration={diffDuration} />
                    </div>
                    <div className="right-align-user">
                        <div className='option-left'>
                            {post.userID._id === userID &&
                                <DropdownPostOptions post={post} setVisible={setVisible} dropdownValue={dropdownValue} setdropdownValue={setdropdownValue} />
                            }
                        </div>
                        <div className='option-right'>
                            {post.userID._id === userID &&
                                <button
                                    className="btn btn-delete"
                                    onClick={() => post._id && handleDeletePost(post._id)}
                                ><i className="fa fa-remove" style={{ color: "red", fontSize: '20px' }}></i>
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="row-content">
                    <div className="user-post-text-container">
                        <h2 className="user-post-text">{post.content}</h2>
                    </div>
                    <hr />
                </div>
                <CommentsButtons post={post} unlikePost={unlikePost} handleLikePost={handleLikePost} showComments={showComments} />
                <hr />
                <div className="comments-container">
                    {(isShown && post._id === clickedPostId) ? AllComments(post) : FirstThreeComments(post)}
                </div>
                <form onSubmit={(e: any) => {
                    e.preventDefault()
                    createComment(e.target[0].value, post._id)
                    e.target[0].value = ''
                }}>
                    <Input className="text-comment-input" placeholder='Add comment'></Input>
                </form>
            </div>
        </div>
    );
}

export default SinglePost;