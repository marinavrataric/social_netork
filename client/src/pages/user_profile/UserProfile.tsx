import React, { useContext, useState, useEffect } from 'react'
import './profile.css'
import { useLocation } from 'react-router-dom'
import SinglePost from '../../components/single_post/SinglePost'
import { PostContext } from '../../context/PostContext'
import { Button } from 'reactstrap'
import Axios from 'axios'
import { AppContext } from '../../context/AppContext'
import Following from '../../components/following/Following'
import Followers from '../../components/followers/Followers'
import { PostInterface } from '../../interfaces/PostInterface'
import { UserInterface } from '../../interfaces/UserInterface'
import { config } from '../../constants/generalConstants'
import moment from 'moment';
import UserInfo from '../../components/user_info/UserInfo'

function UserProfile() {
    const { updatedPosts } = useContext(PostContext)
    const { userID } = useContext(AppContext);

    const location = useLocation<UserInterface>()

    const [isFollowingOpen, setIsFollowingOpen] = useState(false)
    const [isFollowersOpen, setIsFollowersOpen] = useState(false)

    const dateNow = new Date()

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
    const usersPosts = allPostsCopy.filter((post: PostInterface) => (post.userID && post.userID._id === userProfile._id))

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
            <UserInfo userProfile={userProfile} />
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
                ? <h3>No posts yet</h3>
                :
                usersPosts.map((post: PostInterface) => {
                    const startDate = moment(post.registration_date)
                    const timeEnd = moment(dateNow)
                    const diff = timeEnd.diff(startDate)
                    const diffDuration = moment.duration(diff)
                    return <SinglePost post={post} diffDuration={diffDuration} />
                }
                )
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