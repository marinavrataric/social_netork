import React, { useState, useContext } from 'react'
import { Modal, ModalHeader, ModalBody, Label, ModalFooter, Button, Input, FormGroup, Alert } from 'reactstrap'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

function Login(props: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const { setToken, dispatch } = useContext(AppContext)

    const loginUser = (e: any) => {
        e.preventDefault()
        
        const config: any = { header: { 'Content-Type': 'application/json' } }
        const user = {
            email,
            password
        }
        axios
            .post('api/auth', user, config)
            .then(res => {
                setToken(res.data.token)
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
                props.toggle(false)
            })
            .catch(err => {
                setErrorMsg(err.response.data.msg)
                console.log('ovo', err.response.data.msg)
                dispatch({ type: 'LOGIN_FAILED' })
            })
    }

    const closeModal = () => {
        props.toggle(false)
    }

    console.log('error:', errorMsg)

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}

            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={loginUser}
                    disabled={!email || !password}
                >Sign In</Button>
                <Button
                    color="danger"
                    onClick={closeModal}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Login
