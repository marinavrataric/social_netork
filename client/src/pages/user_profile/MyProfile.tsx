import React, { useState, useEffect, useContext } from 'react'
import './profile.css'
import Axios from 'axios'
import SinglePost from '../../components/single_post/SinglePost'
import { AppContext } from '../../context/AppContext'
import UpdateProfile from '../../modals/UpdateProfile'
import { PostContext } from '../../context/PostContext'
import UpdatePhoto from '../../modals/UpdatePhoto'
import avatar from '../../assets/avatar.png'
import Following from '../../components/following/Following'
import Followers from '../../components/followers/Followers'
import '../../components/followers/follow.css'

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

function MyProfile() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        userBio: 'Write something about yourself.',
        userPhoto: ''
    })
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
    const [following, setFollowing] = useState(null)
    const [followers, setFollowers] = useState(0)
    const [followingUsers, setFollowingUsers] = useState<Array<FollowUser>>([{ first_name: '', last_name: '', profile_image: '' }])
    const [followersUsers, setFollowersUsers] = useState<Array<FollowUser>>([{ first_name: '', last_name: '', profile_image: '' }])
    const [isFollowingOpen, setIsFollowingOpen] = useState(false)
    const [isFollowersOpen, setIsFollowersOpen] = useState(false)

    const { userID, setUserID } = useContext(AppContext)
    const { updatedPosts } = useContext(PostContext)

    const storedToken = localStorage.getItem('token')

    // get users posts
    const allPostsCopy = updatedPosts
    const usersPosts = allPostsCopy.filter((post: Post) => (post.userID && post.userID._id === userID))

    // get user data
    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        Axios
            .get('/api/auth/user', config)
            .then(res => {
                const user = res.data.user
                setFollowers(res.data.user.followers.length)
                setFollowing(res.data.user.following.length)
                setFollowingUsers(user.following)
                setFollowersUsers(user.followers)
                setUserID(user._id)
                setUserInfo({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio,
                    userPhoto: user.profile_image
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="profile-container">
            <button className="btn-edit" onClick={() => setIsEditOpen(true)}>
                <i className="fa fa-edit"></i>
            </button>
            <div className="user-info">
                <div className="user-info-img">
                    <div className="img-circular">
                        <img
                            alt='avatar'
                            className="user-profile-img2"
                            src={userInfo.userPhoto ? userInfo.userPhoto : avatar}
                            onClick={() => setIsPhotoModalOpen(true)}
                        ></img>
                    </div>
                    <div className="middle">
                        <p className="update-photo">Update photo</p>
                    </div>
                </div>
                <p className="user-name">{userInfo.firstName} {userInfo.lastName}</p>
                <p className="about-user">{userInfo.userBio}</p>
            </div>
            <div className="user-posts">
                <p className="my-posts-title">My Posts</p>
            </div>
            <button className="btn-follow" onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                <p className="follow-title">{followers} {followers && followers < 2 ? 'follower' : 'followers'} </p>
            </button>
            <button className="btn-follow" onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                <p className="follow-title">{following} following</p>
            </button>
            {usersPosts.length === 0
                ? <h3>No posts yet</h3>
                : <SinglePost updatedPosts={usersPosts}></SinglePost>
            }
            {isEditOpen && <UpdateProfile
                userID={userID}
                setIsEditOpen={setIsEditOpen}
                isEditOpen={isEditOpen}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
            />}
            {isPhotoModalOpen && <UpdatePhoto
                userID={userID}
                setIsPhotoModalOpen={setIsPhotoModalOpen}
                isPhotoModalOpen={isPhotoModalOpen}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
            />}
            {isFollowingOpen &&
                <Following
                    followingUsers={followingUsers}
                    isFollowingOpen={isFollowingOpen}
                    setIsFollowingOpen={setIsFollowingOpen}
                />
            }
            {isFollowersOpen &&
                <Followers
                    followersUsers={followersUsers}
                    isFollowersOpen={isFollowersOpen}
                    setIsFollowersOpen={setIsFollowersOpen}
                />
            }
        </div>
    )
}

export default MyProfile