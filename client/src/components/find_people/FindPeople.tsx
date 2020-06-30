import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function FindPeople() {

    const { allUsers } = useContext(AppContext)

    return (
        <div>
            <h1>All Users</h1>
            {allUsers.map((user: { first_name: string, last_name: string }) => {
                return <div>
                    <h3>{user.first_name} {user.last_name}</h3>
                </div>
            })}
        </div>
    )
}

export default FindPeople
