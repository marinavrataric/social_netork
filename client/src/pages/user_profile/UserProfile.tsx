import React, { useContext, useState } from 'react'
import './profile.css'
import avatar from '../../assets/avatar.png'
import { useLocation } from 'react-router-dom'
import SinglePost from '../../components/single_post/SinglePost'
import { PostContext } from '../../context/PostContext'
import { Button } from 'reactstrap'
import Axios from 'axios'
import { AppContext } from '../../context/AppContext'

interface User {
    _id: string,
    first_name: string,
    last_name: string,
    user_bio: string,
    profile_image: string,
    following: Array<string>,
    followers: Array<string>
}

interface Post {
    userID: {
        _id: string
    }
}

function UserProfile() {
    const { updatedPosts } = useContext(PostContext)
    const location = useLocation<User>()
    const { userID } = useContext(AppContext);

    const userProfile = {
        _id: location.state._id,
        firstName: location.state.first_name,
        lastName: location.state.last_name,
        userBio: location.state.user_bio,
        profile_image: location.state.profile_image,
        following: location.state.following,
        followers: location.state.followers
    }

    // get users posts
    const allPostsCopy = updatedPosts
    const usersPosts = allPostsCopy.filter((post: Post) => (post.userID && post.userID._id === userProfile._id))


    // follow
    const followUser = (id: any) => {
        console.log('user ID:', id)
        const storedToken = localStorage.getItem('token')
        const body = {
            followId: id
        }
        const config = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        Axios.put('/api/users/follow', body, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    // unfollow
    const unfollowUser = (id: any) => {
        console.log('user ID:', id)
        const storedToken = localStorage.getItem('token')
        const body = {
            unfollowId: id
        }
        const config = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        Axios.put('/api/users/unfollow', body, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

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
                <p>{userProfile.followers.length} {userProfile.followers && userProfile.followers.length < 2 ? 'follower' : 'followers'} </p>
                <p>{userProfile.following.length} following</p>
                {!userProfile.followers.includes(userID)
                            ?
                            <Button color="info" onClick={() => followUser(userProfile._id)}>Follow</Button>
                            :
                            <Button color="info" onClick={() => unfollowUser(userProfile._id)}>Unollow</Button>

                        }
                {usersPosts.length === 0
                    ? <h4>No posts yet</h4>
                    : <SinglePost updatedPosts={usersPosts} />
                }
            </div>
        </div>
    )
}

export default UserProfile