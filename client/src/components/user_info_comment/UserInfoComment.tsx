import React from 'react'
import avatar from '../../assets/avatar.png'

function UserInfoComment({post, PostTime, diffDuration}: any) {
    return (
        <div className="user-name-photo">
            <div className="img-circular-mini">
                    <img
                        className="user-photo-mini"
                        src={post.userID.profile_image === '' ? avatar : `http://localhost:5000/${post.userID.profile_image}`}
                        alt='user profile img'
                    ></img>
            </div>

            <div className="right-user-name-post">
                {post.userID && <p className="user-name-post">
                    {post.userID.first_name} {post.userID.last_name}
                </p>}
                {PostTime(diffDuration.days(), diffDuration.hours(), diffDuration.minutes())}
            </div>
        </div>
    )
}

export default UserInfoComment
