import React, { useContext } from 'react'
import './profile.css'
import avatar from '../../assets/avatar.png'
import { useLocation } from 'react-router-dom'
import SinglePost from '../../components/single_post/SinglePost'
import { PostContext } from '../../context/PostContext'

interface User {
    _id: string,
    first_name: string,
    last_name: string,
    user_bio: string,
    profile_image: string
}

interface Post {
    userID: {
        _id: string
    }
}

function UserProfile() {
    const { updatedPosts } = useContext(PostContext)
    const location = useLocation<User>()

    const userProfile = {
        _id: location.state._id,
        firstName: location.state.first_name,
        lastName: location.state.last_name,
        userBio: location.state.user_bio,
        profile_image: location.state.profile_image
    }

    // get users posts
    const allPostsCopy = updatedPosts
    const usersPosts = allPostsCopy.filter((post: Post) => (post.userID && post.userID._id === userProfile._id))

    return (
        <div className="profile-container">
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
            <div className="user-posts">
                <p className="my-posts-title">My Posts</p>
                {usersPosts.length === 0
                    ? <h4>No posts yet</h4>
                    : <SinglePost updatedPosts={usersPosts} />
                }
            </div>
        </div>
    )
}

export default UserProfile