import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import './router.css'
import { AppContext } from '../context/AppContext'

function Links() {

    const { state, logoutModal, setLogoutModal } = useContext(AppContext)

    return (
        <div className="nav">
            <Nav className="nav">
                <div className="nav-left">
                    <NavItem className="nav-item">
                        <NavLink
                            to="/"
                            exact
                            className="nav-link"
                            activeStyle={{ color: "rgb(35, 204, 255)" }}
                        >Social network</NavLink>
                    </NavItem>
                </div>
                <div className="nav nav-right">
                    <NavItem className="nav-item">
                        <NavLink
                            to="/findPeople"
                            className="nav-link"
                            activeStyle={{ color: "rgb(35, 204, 255)" }}
                        >Find people</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink
                            to="/posts"
                            className="nav-link"
                            activeStyle={{ color: "rgb(35, 204, 255)" }}
                        >Posts</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink
                            to="/myProfile"
                            className="nav-link"
                            activeStyle={{ color: "rgb(35, 204, 255)" }}
                        >My profile</NavLink>
                    </NavItem>
                    {state.isAuthenticated && <NavItem className="nav-item">
                        <NavLink
                            to="/logout"
                            className="nav-link"
                            activeStyle={{ color: "rgb(35, 204, 255)" }}
                            onClick={() => setLogoutModal(!logoutModal)}
                        >Log out</NavLink>
                    </NavItem>}
                </div>
            </Nav>
        </div>
    )
}

export default Links
