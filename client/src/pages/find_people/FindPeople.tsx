import React, { useContext, useState } from 'react';
import { Button, Input } from 'reactstrap';
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
    followers: any,
    following: Array<string>
}

function FindPeople() {

    const { allUsers, userID } = useContext(AppContext);

    const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);

    const allUserWithoutAuthUser = allUsers.filter((user: User) => (user._id !== userID))

    // follow
    const followUser = (id: any) => {
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
    }
    // unfollow
    const unfollowUser = (id: any) => {
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
    }

    const [inputSearch, setInputSearch] = useState('')

    const searchUser = (e: any) => {
        e.preventDefault()
        inputSearch.toLowerCase()
        e.target[0].value = ''
    }

    const filterResult = allUserWithoutAuthUser.filter((user: { first_name: string, last_name: string }) => {
        const userName = user.first_name + ' ' + user.last_name
        if (userName.toLowerCase().includes(inputSearch)) {
            return user
        }
    })

    const allUsersDisplayed = filterResult.map((user: User) => {
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
                        {!(user.followers.map((follower: { _id: string }) => follower._id)).includes(userID)
                            ?
                            <Button color="info" className="btn-find" onClick={() => followUser(user._id)}>Follow</Button>
                            :
                            <Button color="info" className="btn-find" onClick={() => unfollowUser(user._id)}>Unfollow</Button>
                        }{' '}
                        <Button color="info" className="btn-find" onClick={() => setIsOpenUserProfile(true)}>
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
        <div className="center">
            <form onSubmit={searchUser}>
                <Input
                    placeholder="Search user..."
                    onChange={(e: any) => setInputSearch(e.target.value)}
                    className="searchbox"
                ></Input>
            </form>
            {allUsersDisplayed}
        </div>
    )
}

export default FindPeople;