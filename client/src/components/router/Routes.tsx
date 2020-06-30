import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import FindPeople from '../find_people/FindPeople'
import Posts from '../Home/Posts'
import MyProfile from '../Home/MyProfile'
import Logout from '../modals/Logout'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/findPeople" component={FindPeople} />
            <Route path="/posts" component={Posts} />
            <Route path="/myProfile" component={MyProfile} />
            <Route path="/logout" component={Logout} />
        </Switch>
    )
}

export default Routes
