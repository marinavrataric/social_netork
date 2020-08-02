import React, { useState, useContext } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap'
import Axios from 'axios'
import { AppContext } from '../context/AppContext'
import { configWithoutToken } from '../constants/generalConstants'
import SingleFormGroup from '../components/form_group/SingleFormGroup'

function Login({ toggle, modal }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const { setToken, dispatch } = useContext(AppContext)

    const loginUser = (e: any) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        Axios
            .post('api/auth', user, configWithoutToken)
            .then(res => {
                setToken(res.data.token)
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
                toggle(false)
            })
            .catch(err => {
                setErrorMsg(err.response.data.msg)
                dispatch({ type: 'LOGIN_FAILED' })
            })
    }

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
                <SingleFormGroup labelName='Email' setValue={setEmail} type={'email'} />
                <SingleFormGroup labelName='Password' setValue={setPassword} type={'password'} />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={loginUser}
                    disabled={!email || !password}
                >Sign In</Button>
                <Button
                    color="danger"
                    onClick={() => toggle(false)}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Login