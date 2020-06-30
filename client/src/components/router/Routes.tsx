import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import FindPeople from '../find_people/FindPeople'
import Posts from '../posts/Posts'
import MyProfile from '../UserProfile.tsx/MyProfile'
import Logout from '../modals/Logout'
import UserProfile from '../UserProfile.tsx/UserProfile'
import { AppContext } from '../context/AppContext'

function Routes() {

    const {state} = useContext(AppContext)

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/findPeople" component={() => state.isAuthenticated ? <FindPeople /> : <Home />} />
            <Route path="/posts" component={() => state.isAuthenticated ? <Posts /> : <Home />} />
            <Route path="/myProfile" component={() => state.isAuthenticated ? <MyProfile /> : <Home />} />
            <Route path="/userProfile" component={() => state.isAuthenticated ? <UserProfile /> : <Home />} />
            <Route path="/logout" component={Logout} />
        </Switch>
    )
}

export default Routes
