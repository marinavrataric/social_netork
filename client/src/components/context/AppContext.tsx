import { createContext } from "react";
import { userInfo } from "os";

export const AppContext = createContext({
    token: '',
    setToken: (token: string) => {},
    state: {
        user_data: {
            first_name: '',
            last_name: '',
            _id: ''
        },
        isAuthenticated: false,
        isLoading: true
    },
    dispatch: (state: {}) => {},
    allUsers: [],
    setAllUsers: (allUsers: []) => {},
    logoutModal: false,
    setLogoutModal: (logoutModal: boolean) => {},
    userID: '',
    setUserID: (userID: string) => {},
    allPosts: [],
    setAllPosts: (allPosts: []) => {},
    setPosts: (posts: []) => {}
})
