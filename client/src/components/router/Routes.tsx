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
    const { state } = useContext(AppContext);

    interface allPostsProps {
        content: string;
        _id?: string;
    }

    const [allPosts, setAllPosts] = useState<allPostsProps[]>([{ content: '' }]);
    const storedToken = localStorage.getItem('token');

    const setPosts = (textInput: string, id: string) => {
        setAllPosts((prevState) => [...prevState, { content: textInput, _id: id }]);
        console.log(allPosts);
    };

    const deletePost = (postId: string) => setAllPosts(allPosts.filter((post) => post._id !== postId));

    const config: any = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        },
    };

    // get all posts
    useEffect(() => {
        Axios.get('/api/posts', config)
            .then((res) => {
                console.log('all')
                console.log( res.data[0].content)
                setAllPosts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Switch>
            {console.log('all',allPosts)}
            <Route path="/" exact component={Home} />
            <Route path="/findPeople" component={() => (state.isAuthenticated ? <FindPeople /> : <Home />)} />
            <Route
                path="/posts"
                component={() =>
                    state.isAuthenticated ? (
                        <PostContext.Provider value={{ allPosts, setPosts, deletePost }}>
                            <Posts />
                        </PostContext.Provider>
                    ) : (
                        <Home />
                    )
                }
            />
            <Route path="/myProfile" component={() => (state.isAuthenticated ? <MyProfile /> : <Home />)} />
            <Route path="/userProfile/:id" component={() => (state.isAuthenticated ? <UserProfile /> : <Home />)} />
            <Route path="/logout" component={Logout} />
        </Switch>
    );
}

export default Routes;
