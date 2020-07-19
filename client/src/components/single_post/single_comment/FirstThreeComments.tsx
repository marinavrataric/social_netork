import React, { useContext } from 'react'
import Axios from 'axios';
import avatar from '../../../assets/avatar.png'
import { AppContext } from '../../../context/AppContext';

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
    }
}

function FirstThreeComments(post: Post) {
    const { userID } = useContext(AppContext)

    const storedToken = localStorage.getItem('token');
    const config = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }

    const deleteComment = (commentId: any) => {
        const postId = post._id
        Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)
    }

    return post.comments.slice(0, 3).map((item: any) => {
        return (
            <div className="comment-container">
                <div className="img-comment-circular-mini">
                    <img alt='avatar' src={item.userID.profile_image === '' ? avatar : `http://localhost:5000/${item.userID.profile_image}`} className="user-photo-mini"></img>
                </div>
                <div className="comment-text-container">
                    <p className="text-bold">{item.userID.first_name} {item.userID.last_name}</p>
                    <p className="comment">{item.text}</p>
                    <div className="div-comment-delete">
                        {item.userID._id === userID && <button className="bt" onClick={() => deleteComment(item._id)}>
                            <i className="fa fa-remove" style={{ fontSize: "14px", color: "red" }}></i>
                        </button>}
                    </div>
                </div>

            </div>
        )
    })
}

export default FirstThreeComments
