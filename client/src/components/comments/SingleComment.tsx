import React, { useContext } from 'react'
import avatar from '../..//assets/avatar.png'
import { AppContext } from '../../context/AppContext';

function SingleComment({item, deleteComment}: any) {
    const { userID } = useContext(AppContext)

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
}

export default SingleComment
