import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.png';

function UserCard({ user, userID, followUser, unfollowUser }: any) {
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
                    {(user.followers.map((follower: { _id: string }) => follower._id)).includes(userID) && <Button color="info" className="btn-find">
                        <Link
                            to={{
                                pathname: `/userProfile/${user._id}`,
                                state: user,
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <p className="btn-name">View Profile</p>
                        </Link>
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default UserCard
