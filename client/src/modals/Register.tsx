import React, { useState, useContext } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { configWithoutToken } from '../constants/generalConstants'
import SingleFormGroup from '../components/form_group/SingleFormGroup'

function Register({ toggle, modal }: any) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const { dispatch, setToken } = useContext(AppContext)

    const validateSignUp = (e: any) => {
        e.preventDefault()
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        }
        axios
            .post('/api/users', user, configWithoutToken)
            .then(res => {
                setToken(res.data.token)
                dispatch({ type: 'REGISTER_SUCCESS', payload: res.data })
                toggle(false)
            })
            .catch(err => {
                setErrorMsg(err.response.data.msg)
                dispatch({ type: "REGISTER_FAILED" })
            })
    }

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            {errorMsg && <Alert color="warning">{errorMsg}</Alert>}
            <ModalHeader>Sign Up</ModalHeader>
            <ModalBody>
                <SingleFormGroup labelName='First Name' setValue={setFirstName} type={'text'} />
                <SingleFormGroup labelName='Last Name' setValue={setLastName} type={'text'} />
                <SingleFormGroup labelName='Email' setValue={setEmail} type={'email'} />
                <SingleFormGroup labelName='Password' setValue={setPassword} type={'password'} />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={validateSignUp}
                    disabled={!firstName || !lastName || !email || !password}
                >Sign Up</Button>
                <Button
                    color="danger"
                    onClick={() => toggle(false)}
                >Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Register