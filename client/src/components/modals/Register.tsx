import React, { useState, useContext } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, FormGroup, Alert } from 'reactstrap'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

function Register(props: any) {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [errorMsg, setErrorMsg] = useState('')

    const { state, dispatch } = useContext(AppContext)

    const validateSignUp = (e: any) => {
        e.preventDefault()

        const config: any = { header: { 'Content-Type': 'application/json' } }
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        }

        axios
            .post('/api/users', user, config)
            .then(res => {
                dispatch({ type: 'REGISTER_SUCCESS', payload: res.data })
            })
            .catch(err => {
                setErrorMsg(err.response.data)
                dispatch({ type: "REGISTER_FAILED" })
            })

        if (firstName === '') {
            props.toggle(false)
        } else {
            props.toggle(true)
        }
    }

    const closeRegisterModal = () => {
        props.toggle(false)
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}

            <ModalHeader>Sign Up</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        onChange={(e: any) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        onChange={(e: any) => setLastName(e.target.value)}
                    />
                </FormGroup>
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
                    onClick={validateSignUp}
                >Sign Up</Button>
                <Button
                    color="danger"
                    onClick={closeRegisterModal}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Register