import React, { useContext, useState, useEffect } from 'react'
import './profile.css'
import avatar from '../../assets/avatar.png'
import { useLocation } from 'react-router-dom'
import SinglePost from '../../components/single_post/SinglePost'
import { PostContext } from '../../context/PostContext'
import { Button } from 'reactstrap'
import Axios from 'axios'
import { AppContext } from '../../context/AppContext'
import Following from '../../components/following/Following'
import Followers from '../../components/followers/Followers'

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

interface FollowUser {
    first_name: string,
    last_name: string,
    profile_image: string
}


function UserProfile() {
    const { updatedPosts } = useContext(PostContext)
    const location = useLocation<User>()
    const { userID } = useContext(AppContext);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false)
    const [isFollowersOpen, setIsFollowersOpen] = useState(false)
    const [followingUsers, setFollowingUsers] = useState<Array<FollowUser>>([{ first_name: '', last_name: '', profile_image: '' }])
    const [followersUsers, setFollowersUsers] = useState<Array<FollowUser>>([{ first_name: '', last_name: '', profile_image: '' }])

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

    const storedToken = localStorage.getItem('token')

    const config = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }

    // follow
    const followUser = (id: any) => {
        const body = {
            followId: id
        }
        Axios.put('/api/users/follow', body, config)
    }
    // unfollow
    const unfollowUser = (id: any) => {
        const body = {
            unfollowId: id
        }
        Axios.put('/api/users/unfollow', body, config)
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
                <button className="btn-follow btn-follow-marg" onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                    <p className="follow-title">{userProfile.followers.length} {userProfile.followers && userProfile.followers.length < 2 ? 'follower' : 'followers'} </p>
                </button>
                <button className="btn-follow btn-follow-marg" onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                    <p className="follow-title">{userProfile.following.length} following</p>
                </button>
                {!(userProfile.followers.map((follower: any) => follower._id)).includes(userID)
                    ?
                    <Button color="info" className="btn-follow-user" onClick={() => followUser(userProfile._id)}>Follow</Button>
                    :
                    <Button color="info" className="btn-follow-user" onClick={() => unfollowUser(userProfile._id)}>Unfollow</Button>
                }
                <hr className="hr"/>
                {usersPosts.length === 0
                    ? <h4>No posts yet</h4>
                    : <SinglePost updatedPosts={usersPosts} />
                }
            </div>
            {isFollowingOpen &&
                <Following
                    followingUsers={userProfile.following}
                    isFollowingOpen={isFollowingOpen}
                    setIsFollowingOpen={setIsFollowingOpen}
                />
            }
            {isFollowersOpen &&
                <Followers
                    followersUsers={userProfile.followers}
                    isFollowersOpen={isFollowersOpen}
                    setIsFollowersOpen={setIsFollowersOpen}
                />
            }
        </div>
    )
}

export default UserProfile