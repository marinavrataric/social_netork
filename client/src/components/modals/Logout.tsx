import React, { useContext } from 'react'
import { ModalBody, ModalHeader, ModalFooter, Button, Modal } from 'reactstrap'
import { AppContext } from '../context/AppContext'

function Logout() {

    const { logoutModal, setLogoutModal, dispatch } = useContext(AppContext)

    const toggle = () => setLogoutModal(!logoutModal)

    const logoutUser = () => {
        dispatch({ type: 'LOG_OUT_USER' })
        localStorage.removeItem('token')
        toggle()
    }

    const cancelLogout = () => {
        toggle()
    }

    return (
        <Modal isOpen={logoutModal} toggle={toggle}>
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