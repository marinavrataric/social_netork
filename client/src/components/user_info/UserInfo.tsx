import React from 'react'
import avatar from '../../assets/avatar.png'

function UserInfo({userProfile} : any) {
    return (
        <div className="user-info">
            <div className="img-circular">
                <img
                    alt='avatar'
                    className="user-profile-img2"
                    src={userProfile.profile_image ? `http://localhost:5000/${userProfile.profile_image}` : avatar}
                ></img>
            </div>
            <p className="user-name">{userProfile.firstName} {userProfile.lastName}</p>
            <p className="about-user">{userProfile.userBio}</p>
        </div>
    )
}

export default UserInfo
