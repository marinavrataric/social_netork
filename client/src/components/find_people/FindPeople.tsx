import React, { useContext, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import avatar from './avatar.png';
import './findPeople.css';

function FindPeople() {
    const { allUsers, userID } = useContext(AppContext);

    const [isClicked, setIsClicked] = useState(false);

    const allUserWithout = allUsers.filter((user: {_id: string}) => {
        if(user._id !== userID) {
            return user
        }
    })

    const allUsersDisplayed = allUserWithout.map((user: { first_name: string; last_name: string; _id: string }) => {
        return (
            <div className="user-container" key={user._id}>
                <div className="user-card">
                    <div className="left">
                        <div className="circular">
                            <img src={avatar}></img>
                        </div>
                    </div>
                    <div className="right">
                        <p className="user-info2">
                            {user.first_name} {user.last_name}
                        </p>
                        <Button color="info" onClick={() => setIsClicked(true)}>
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
        );
    });

    return (
        <div>
            <h2 className="title-users">Find People</h2>
            {allUsersDisplayed}
        </div>
    );
}

export default FindPeople;
