import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

function CommentsButtons({post, unlikePost, handleLikePost, showComments}: any) {
    const { userID } = useContext(AppContext)

    return (
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
    )
}

export default CommentsButtons
