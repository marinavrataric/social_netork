import React from 'react'
import { NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { NavItemInterface } from '../../interfaces/NavItemInterface'

function SingleNavItem({ isAuth, routeName, routeAuth, routeNotAuth, logoutModal, setLogoutModal }: NavItemInterface) {
    return (
        <NavItem className="nav-item">
            {isAuth ?
                <NavLink
                    to={routeAuth}
                    className="nav-link"
                    activeStyle={{ color: "rgb(35, 204, 255)" }}
                    onClick={() => setLogoutModal && setLogoutModal(!logoutModal)}
                >{routeName}</NavLink>
                : <NavLink
                    to={routeNotAuth}
                    className="nav-link"
                >{routeName}</NavLink>
            }
        </NavItem>
    )
}

export default SingleNavItem
