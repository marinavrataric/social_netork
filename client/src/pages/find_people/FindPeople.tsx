import React, { useContext, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import avatar from '../../assets/avatar.png';
import './findPeople.css';
import Axios from 'axios';

interface User {
    _id: string,
    first_name: string,
    last_name: string,
    profile_image: string,
    followers: Array<string>,
    following: Array<string>
}

function FindPeople() {

    const { allUsers, userID } = useContext(AppContext);

    const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);

    const allUserWithoutAuthUser = allUsers.filter((user: User) => (user._id !== userID))

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

    const allUsersDisplayed = allUserWithoutAuthUser.map((user: User) => {
        return (
            <div className="user-container" key={user._id}>
                <div className="user-card">
                    <div className="left">
                        <div className="circular">
                            <img alt='avatar' src={user.profile_image === '' ? avatar : user.profile_image}></img>
                        </div>
                    </div>
                    <div className="right">
                        <p className="user-info2">
                            {user.first_name} {user.last_name}
                        </p>
                        {!user.followers.includes(userID)
                            ?
                            <Button color="info" onClick={() => followUser(user._id)}>Follow</Button>
                            :
                            <Button color="info" onClick={() => unfollowUser(user._id)}>Unollow</Button>

                        }
                        <Button color="info" onClick={() => setIsOpenUserProfile(true)}>
                            <Link
                                to={{
                                    pathname: `/userProfile/${user._id}`,
                                    state: user,
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                <p className="btn-name">View Profile</p>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <h2 className="title-users">Find People</h2>
            {allUsersDisplayed}
        </div>
    )
}

export default FindPeople;