import React, { useContext, useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import FindPeople from '../find_people/FindPeople'
import Posts from '../posts/Posts'
import MyProfile from '../user_profile/MyProfile'
import Logout from '../modals/Logout'
import UserProfile from '../user_profile/UserProfile'
import { AppContext } from '../context/AppContext'
import { PostContext } from '../posts/PostContext'
import Axios from 'axios'

function Routes() {

    const { state } = useContext(AppContext)

    const [allPosts, setAllPosts] = useState([{ content: '' }])
    const storedToken = localStorage.getItem('token')

    const setPosts = (posts: []) => {
        setAllPosts(posts)
    }

    const config: any = {
        headers: {
            "x-auth-token": `${storedToken}`,
            'Content-Type': 'application/json'
        }
    }

    // get all posts
    useEffect(() => {
        Axios
            .get('/api/posts', config)
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    console.log(allPosts);

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/findPeople" component={() => state.isAuthenticated ? <FindPeople /> : <Home />} />
            <Route path="/posts" component={() => state.isAuthenticated ? <PostContext.Provider value={{ allPosts, setAllPosts, setPosts }}><Posts /></PostContext.Provider> : <Home />} />
            <Route path="/myProfile" component={() => state.isAuthenticated ? <MyProfile /> : <Home />} />
            <Route path="/userProfile/:id" component={() => state.isAuthenticated ? <UserProfile /> : <Home />} />
            <Route path="/logout" component={Logout} />
        </Switch>
    )
}

export default Routes
