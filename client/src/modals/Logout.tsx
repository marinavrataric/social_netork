import React, { useContext } from 'react'
import { ModalBody, ModalHeader, ModalFooter, Button, Modal } from 'reactstrap'
import { AppContext } from '../context/AppContext'
import { useHistory } from "react-router-dom";

function Logout() {
    const { logoutModal, setLogoutModal, dispatch } = useContext(AppContext)

    const history = useHistory()

    const toggle = () => setLogoutModal(!logoutModal)

    const logoutUser = () => {
        dispatch({ type: 'LOG_OUT_USER' })
        localStorage.removeItem('token')
        toggle()
        history.push('/')
    }

    const cancelLogout = () => {
        toggle()
        history.goBack()
    }

    return (
        <Modal isOpen={logoutModal} toggle={toggle} backdrop="static">
            <ModalHeader>Log out</ModalHeader>
            <ModalBody>Are you sure you want to log out?</ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={logoutUser}
                >Log out</Button>
                <Button
                    color="danger"
                    onClick={cancelLogout}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Logout