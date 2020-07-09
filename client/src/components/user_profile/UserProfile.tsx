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
    _id: string,
    profile_image: string
}

function UserProfile() {

    const location = useLocation<User>()
    const userProfile = {
        firstName: location.state.first_name,
        lastName: location.state.last_name,
        userBio: location.state.user_bio,
        _id: location.state._id,
        profile_image: location.state.profile_image
    }

    const { allPosts, updatedPosts } = useContext(PostContext)

    console.log('nasljedjeno', userProfile)


    // get users posts
    const allPostsCopy = updatedPosts
    const usersPosts = allPostsCopy.filter((post: any) => {
        if (post.userID && post.userID._id === userProfile._id) {
            console.log('aaa', post)

            return post
        }
    })

    return (
        <div className="profile-container">
            <div className="user-info">
                <div className="img-circular">
                    <img className="user-profile-img2" src={userProfile.profile_image ? `http://localhost:5000/${userProfile.profile_image}` : avatar}></img>
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