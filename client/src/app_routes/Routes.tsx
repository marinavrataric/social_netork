import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import FindPeople from '../pages/find_people/FindPeople';
import Posts from '../pages/posts/Posts';
import MyProfile from '../pages/user_profile/MyProfile';
import Logout from '../modals/Logout';
import UserProfile from '../pages/user_profile/UserProfile';
import { AppContext } from '../context/AppContext';
import { PostContext } from '../context/PostContext';
import Axios from 'axios';

interface allPostsProps {
    content: string;
    _id?: string;
    registration_date?: string,
    likes?: []
}

function Routes() {
    const [updatedPosts, setUpdatedPosts] = useState([])

    const { state, userID } = useContext(AppContext);

    const [allPosts, setAllPosts] = useState<allPostsProps[]>([{ content: '' }]);

    const setPosts = (textInput: string, id: string, registration_date: string, likes: []) => {
        setAllPosts((prevState) => [...prevState, {
            content: textInput,
            _id: id,
            registration_date: registration_date,
            likes: likes
        }]);
    }

    const deletePost = (postId: string) => setAllPosts(allPosts.filter((post) => post._id !== postId));

    const likePost = (postId: string, likes: []) => {
        const tempPost = allPosts.filter(el => el._id === postId);
        const tempLikes: any = tempPost.map(el => el.likes);
        tempLikes.push(userID);
        setAllPosts((prevState) => [...prevState, { content: '', likes: tempLikes }]);
    }

    const unLikePost = (postId: string, likes: []) => {
        const tempPost2 = allPosts.filter(el => el._id === postId);
        const tempLikes2: any = tempPost2.map(el => el.likes);
        tempLikes2.pop(userID);
        setAllPosts((prevState) => [...prevState, { content: '', likes: tempLikes2 }]);
    }

    const storedToken = localStorage.getItem('token');
    const config: any = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }

    // get all posts
    useEffect(() => {
        Axios.get('/api/posts', config)
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, []);

    // get all comments
    useEffect(() => {
        Axios.get('api/posts/comment', config)
            .then(res => setUpdatedPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    //console.log('routes')
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/findPeople">
                {state.isAuthenticated ? <FindPeople /> : <Home />}
            </Route>
            <Route path="/posts">
                {state.isAuthenticated
                    ?
                    <PostContext.Provider value={{ allPosts, setPosts, deletePost, likePost, unLikePost, updatedPosts }}>
                        <Posts />
                    </PostContext.Provider>
                    :
                    <Home />
                }
            </Route>
            <Route path="/myProfile">
                {state.isAuthenticated
                    ?
                    <PostContext.Provider value={{ allPosts, deletePost, likePost, setPosts, unLikePost, updatedPosts }}>
                        <MyProfile />
                    </PostContext.Provider>
                    : <Home />
                }
            </Route>
            <Route path="/userProfile/:id">
                {state.isAuthenticated
                    ?
                    <PostContext.Provider value={{ allPosts, deletePost, likePost, setPosts, unLikePost, updatedPosts }}>
                        <UserProfile />
                    </PostContext.Provider>
                    : <Home />
                }
            </Route>
            <Route path="/logout">
                <Logout />
            </Route>
        </Switch>
    );
}

export default Routes;