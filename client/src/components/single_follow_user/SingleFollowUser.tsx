import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png'

function SingleFollowUser({following}: any) {
    return (
        <div>
             <div className="follower-user-container">
                <div className="img-comment-circular-mini">
                    <Link
                        to={{
                            pathname: `/userProfile/${following._id}`,
                            state: following,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            alt="avatar"
                            className="user-photo-mini"
                            src={following.profile_image === "" ? avatar : `http://localhost:5000/${following.profile_image}`}
                        ></img>
                    </Link>
                </div>
                <h5 className="follow-user-name">{following.first_name} {following.last_name}</h5>
            </div>
        </div>
    )
}

export default SingleFollowUser
