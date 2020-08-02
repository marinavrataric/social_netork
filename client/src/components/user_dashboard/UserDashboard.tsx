import React from 'react'
import avatar from '../../assets/avatar.png'

function UserDashboard({ userInfo, setIsPhotoModalOpen, setIsFollowersOpen, isFollowersOpen, followers, following, setIsFollowingOpen, isFollowingOpen }: any) {
    return (
        <div className="user-info">
            <div className="img-circular">
                <img
                    alt='avatar'
                    className="user-profile-img"
                    src={userInfo.userPhoto ? userInfo.userPhoto : avatar}
                    onClick={() => setIsPhotoModalOpen(true)}
                ></img>
                <div className="middle">
                    <p className="update-photo">Update photo</p>
                </div>
            </div>
            <p className="user-name">{userInfo.firstName} {userInfo.lastName}</p>
            <p className="about-user">{userInfo.userBio}</p>
            <button className="btn-follow" onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                <p className="follow-title">{followers} {followers && followers < 2 ? 'follower' : 'followers'} </p>
            </button>
            <button className="btn-follow" onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                <p className="follow-title">{following} {following && following < 2 ? 'following' : 'followings'}</p>
            </button>
        </div>
    )
}

export default UserDashboard
