import React, { useState, useReducer, useEffect } from 'react'
import NavigationRouter from './app_routes/NavigationRouter'
import { AppContext } from './context/AppContext'
import axios from 'axios'

interface State {
    isLoading: boolean,
    user_data: {},
    isAuthenticated: boolean
}

function App() {
    const [token, setToken] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [userID, setUserID] = useState('')
    const [logoutModal, setLogoutModal] = useState(false)

    const initState = {
        isLoading: true,
        user_data: null,
        isAuthenticated: false
    }

    const reducer = (state: State, action: any) => {
        switch (action.type) {
            case 'REGISTER_SUCCESS':
            case 'LOGIN_SUCCESS':
                localStorage.setItem('token', token)

                return {
                    ...state,
                    isLoading: false,
                    user_data: action.payload,
                    isAuthenticated: true
                }
            case 'REGISTER_FAILED':
            case 'LOGIN_FAILED':
            case 'LOG_OUT_USER':
            case 'AUTH_ERROR':
                return {
                    isLoading: true,
                    user_data: null,
                    isAuthenticated: false
                }
            case 'USERS_LOADED':
                return {
                    isLoading: false,
                    user_data: action.payload,
                    isAuthenticated: true
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initState)

    const storedToken = localStorage.getItem('token')

    // load all users
    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        axios
            .get('/api/auth/users', config)
            .then(res => {
                setAllUsers(res.data)
                dispatch({ type: 'USERS_LOADED', payload: res.data })
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: 'AUTH_ERROR' })
            })
    }, [storedToken])


    // get user data and save ID
    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        axios
            .get('/api/auth/user', config)
            .then(res => {
               // console.log(res.data.user)
                const user = res.data.user
                setUserID(user._id)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <AppContext.Provider value={{
            token, setToken,
            state, dispatch,
            allUsers, setAllUsers,
            logoutModal, setLogoutModal,
            userID, setUserID
        }}>
            <div className="app">
                <NavigationRouter />
            </div>
        </AppContext.Provider>
    )
}

export default App