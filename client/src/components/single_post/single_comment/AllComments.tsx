import React from 'react'
import Axios from 'axios'
import { Button } from 'reactstrap';

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

function AllComments(post: Post) {
    const storedToken = localStorage.getItem('token');
    const config = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }

    const deleteComment = (commentId: any) => {
        const postId = post._id
        console.log(post._id, commentId)
        Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)
            .catch(err => console.log(err))
    }

    return post.comments.map((item: any) => {
        return (
            <div className="comment-container">
                <div className="img-comment-circular-mini">
                    <img alt='avatar' src={`http://localhost:5000/${item.userID.profile_image}`} className="user-photo-mini"></img>
                </div>
                <div className="comment-text-container">
                    <p className="text-bold">{item.userID.first_name} {item.userID.last_name}</p>
                    <p className="comment">{item.text}</p>
                    <div className="div-comment-delete">
                        <button className="bt" onClick={() => deleteComment(item._id)}>
                            <i className="fa fa-remove" style={{ fontSize: "14px", color: "red" }}></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    })

}

export default AllComments