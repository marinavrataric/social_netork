import React, { useState, useContext, useEffect } from 'react'
import './home.css'
import Register from '../../modals/Register'
import Login from '../../modals/Login'
import { AppContext } from '../../context/AppContext'

function Home() {
    const [modalSignUp, setModalSignUp] = useState(false)
    const toggleSignUp = () => setModalSignUp(!modalSignUp)

    const [modalSignIn, setModalSignIn] = useState(false)
    const toggleSignIn = () => setModalSignIn(!modalSignIn)

    const {state} = useContext(AppContext)

    return (
        <div className="home">
            <div className="center-div">
                <h1 className="title">Social Network</h1>
                <div className="buttons">
                    <button
                        className="btn-signup"
                        onClick={toggleSignUp}
                    >Sign Up</button>
                    <button
                        className="btn-signin"
                        onClick={toggleSignIn}
                    >Sign In</button>
                </div>
                {modalSignUp && !state.isAuthenticated && <Register toggle={toggleSignUp} modal={modalSignUp} />}
                {modalSignIn && !state.isAuthenticated && <Login toggle={toggleSignIn} modal={modalSignIn} />}
            </div>
        </div>
    )
}

export default Home