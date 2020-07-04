import React, { useState, useEffect, useContext } from 'react'
import './myprofile.css'
import Axios from 'axios'
import SinglePost from '../single_post/SinglePost'
import { AppContext } from '../context/AppContext'
import UpdateProfile from '../modals/UpdateProfile'

function MyProfile() {

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        userBio: 'Write something about yourself.',
        userPhoto: ''
    })
    const [isEditOpen, setIsEditOpen] = useState(false)

    const { userID, setUserID } = useContext(AppContext)

    // open modal on click 'edit'
    const editUser = () => {
        setIsEditOpen(true)
    }

    // get user data
    const storedToken = localStorage.getItem('token')

    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        Axios
            .get('/api/auth/user', config)
            .then(res => {
                console.log('response', res)
                const user = res.data.user
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
            <button className="btn-edit" onClick={editUser}>
                <i className="fa fa-edit"></i>
            </button>
            <div className="user-info">
                <div className="img-circular">
                    <img className="user-profile-img2" src={userInfo.userPhoto}></img>
                </div>
                <p className="user-name">{userInfo.firstName} {userInfo.lastName}</p>
                <p className="about-user">{userInfo.userBio}</p>
            </div>
            <div className="user-posts">
                <p className="my-posts-title">My Posts</p>
            </div>
            {isEditOpen && <UpdateProfile
                userID={userID}
                setIsEditOpen={setIsEditOpen}
                isEditOpen={isEditOpen}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
            />}
        </div>
    )
}

export default MyProfile