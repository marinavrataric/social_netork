import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import FindPeople from '../find_people/FindPeople';
import Posts from '../posts/Posts';
import MyProfile from '../user_profile/MyProfile';
import Logout from '../modals/Logout';
import UserProfile from '../user_profile/UserProfile';
import { AppContext } from '../context/AppContext';
import { PostContext } from '../posts/PostContext';
import Axios from 'axios';

function Routes() {
    const { state, userID } = useContext(AppContext);

    interface allPostsProps {
        content: string;
        _id?: string;
        registration_date?: string,
        likes?: []
    }

    const [allPosts, setAllPosts] = useState<allPostsProps[]>([{ content: '' }]);

    const setPosts = (textInput: string, id: string, registration_date: string, likes: []) => {
        setAllPosts((prevState) => [...prevState, { content: textInput, _id: id, registration_date: registration_date, likes: likes }]);
       // console.log('ovo', allPosts);
    }

    const deletePost = (postId: string) => setAllPosts(allPosts.filter((post) => post._id !== postId));

    const likePost = (postId: string, likes: []) => {
        console.log('liked post id:', postId)
        console.log('likes', likes)
        const tempPost = allPosts.filter(el => el._id === postId);
        const tempLikes : any = tempPost.map(el => el.likes);
        tempLikes.push(userID);
        console.log("tempLikes" , tempLikes)
        setAllPosts((prevState) => [...prevState, { content: '', likes: tempLikes }]);
       // console.log('all posts', allPosts)
    }

    const storedToken = localStorage.getItem('token');

    // get all posts
    useEffect(() => {
        const config: any = {
            headers: {
                'x-auth-token': `${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        Axios.get('/api/posts', config)
            .then((res) => setAllPosts(res.data))
            .catch((err) => console.log(err));
    }, []);





    const [updatedPosts, setUpdatedPosts] = useState([])
    // get all comments
    useEffect(() => {
        const config = {
            headers: { 'x-auth-token': `${storedToken}` }
        }
        Axios.get('api/posts/comment', config)
            .then(res => {
                setUpdatedPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Switch>
            {console.log('all posts', allPosts)}
            <Route path="/" exact component={Home} />
            <Route path="/findPeople" component={() => (state.isAuthenticated ? <FindPeople /> : <Home />)} />
            <Route
                path="/posts"
                component={() =>
                    state.isAuthenticated ? (
                        <PostContext.Provider value={{ allPosts, setPosts, deletePost, likePost, updatedPosts }}>
                            <Posts />
                        </PostContext.Provider>
                    ) : (
                            <Home />
                        )
                }
            />
            <Route path="/myProfile" component={() => (state.isAuthenticated ? (
                <PostContext.Provider value={{ allPosts, deletePost, likePost, setPosts, updatedPosts }}>
                    <MyProfile />
                </PostContext.Provider>
            ) : <Home />)} />
            <Route path="/userProfile/:id" component={() => (state.isAuthenticated ? (
                <PostContext.Provider value={{ allPosts, setPosts, deletePost, likePost, updatedPosts }}>
                    <UserProfile />
                </PostContext.Provider>
            ) : <Home />)} />
            <Route path="/logout" component={Logout} />
        </Switch>
    );
}

export default Routes;
