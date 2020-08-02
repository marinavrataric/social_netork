import React, { useContext, useState } from 'react';
import { Input } from 'reactstrap';
import { AppContext } from '../../context/AppContext';
import './findPeople.css';
import Axios from 'axios';
import { UserInterface } from '../../interfaces/UserInterface';
import { config } from '../../constants/generalConstants';
import UserCard from '../../components/user_card/UserCard';

function FindPeople() {
    const { allUsers, userID } = useContext(AppContext);

    const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);
    const [inputSearch, setInputSearch] = useState('')

    const allUserWithoutAuthUser = allUsers.filter((user: UserInterface) => (user._id !== userID))

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

    const allUsersDisplayed = filterResult.map((user: UserInterface) => (
        <UserCard
            user={user}
            userID={userID}
            followUser={followUser}
            unfollowUser={unfollowUser}
            setIsOpenUserProfile={setIsOpenUserProfile}
        />
    ))

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