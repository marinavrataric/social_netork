import React, { useContext } from 'react'
import { Nav } from 'reactstrap'
import './router.css'
import { AppContext } from '../context/AppContext'
import SingleNavItem from '../components/nav_item/SingleNavItem'

function Links() {
    const { state, logoutModal, setLogoutModal } = useContext(AppContext)

    return (
        <div className="nav">
            <Nav className="nav">
                <div className="nav-left">
                    <SingleNavItem exact={true} routeName='Social network' routeAuth='/' routeNotAuth='/' />
                </div>
                <div className="nav nav-right">
                    <SingleNavItem exact={false} isAuth={state.isAuthenticated} routeName='Find people' routeAuth='/findPeople' routeNotAuth='/' />
                    <SingleNavItem exact={false} isAuth={state.isAuthenticated} routeName='Posts' routeAuth='/posts' routeNotAuth='/' />
                    <SingleNavItem exact={false} isAuth={state.isAuthenticated} routeName='My profile' routeAuth='/myProfile' routeNotAuth='/' />
                    {state.isAuthenticated && 
                    <SingleNavItem exact={false} isAuth={state.isAuthenticated} routeName='Log out' routeAuth='/logout' routeNotAuth='/logout' logoutModal={logoutModal} setLogoutModal={setLogoutModal} />}
                </div>
            </Nav>
        </div>
    )
}

export default Links
