import React, { useContext } from 'react'
import './myprofile.css'
import avatar from '../find_people/avatar.png'
import { useLocation } from 'react-router-dom'
import SinglePost from '../single_post/SinglePost'
import { PostContext } from '../posts/PostContext'
import { AppContext } from '../context/AppContext'

interface User {
    first_name: string,
    last_name: string,
    user_bio: string,
    _id: string
}

function UserProfile() {

    const location = useLocation<User>()
    const userProfile = {
        firstName: location.state.first_name,
        lastName: location.state.last_name,
        userBio: location.state.user_bio,
        _id: location.state._id
    }

    const { allPosts, updatedPosts } = useContext(PostContext)

    // get users posts
    const allPostsCopy = updatedPosts
    const usersPosts = allPostsCopy.filter((post: any) => {
        if (post.userID && post.userID._id === userProfile._id) {
            return post
        }
    })

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
                {usersPosts.length === 0
                    ? <h4>No posts yet</h4>
                    : <SinglePost updatedPosts={usersPosts} />
                }
            </div>
        </div>
    )
}

export default UserProfile