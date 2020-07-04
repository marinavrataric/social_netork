import React from 'react'
import './myprofile.css'
import avatar from '../find_people/avatar.png'
import { useLocation } from 'react-router-dom'

interface User {
    first_name: string,
    last_name: string,
    user_bio: string
}

function UserProfile() {

    const location = useLocation<User>()
    const userProfile = {
        firstName: location.state.first_name,
        lastName: location.state.last_name,
        userBio: location.state.user_bio
    }

    return (
        <div className="profile-container">
            <div className="user-info">
                <div className="img-circular">
                    <img className="user-profile-img2" src={avatar}></img>
                </div>
                <p className="user-name">{userProfile.firstName} {userProfile.lastName}</p>
                <p className="about-user">{userProfile.userBio}</p>
            </div>
            <div className="user-posts">
                <p className="my-posts-title">My Posts</p>
            </div>
        </div>
    )
}

export default UserProfile