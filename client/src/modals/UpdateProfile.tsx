import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'
import Axios from 'axios'

function UpdateProfile(props: any) {

    const [firstNameUpdated, setFirstNameUpdated] = useState(props.userInfo.firstName)
    const [lastNameUpdated, setLastNameUpdated] = useState(props.userInfo.lastName)
    const [userBioUpdated, setUserBioUpdated] = useState(props.userInfo.userBio)

    // update user
    const updateUser = (e: any) => {
        e.preventDefault()
        props.setIsEditOpen(false)

        const config: any = { header: { "Content-Type": "application/json" } }
        const body = {
            first_name: firstNameUpdated,
            last_name: lastNameUpdated,
            user_bio: userBioUpdated
        }

        Axios
            .put(`/api/users/${props.userID}`, body, config)
            .then(res => {
                const user = res.data
                props.setUserInfo({
                    ...props.userInfo,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {props.isEditOpen &&
                <Modal isOpen={props.isEditOpen} toggle={() => props.setIsEditOpen(!props.isEditOpen)} backdrop="static">
                    <ModalHeader>Update your profile</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                onChange={(e: any) => setFirstNameUpdated(e.target.value)}
                                defaultValue={firstNameUpdated}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                onChange={(e: any) => setLastNameUpdated(e.target.value)}
                                defaultValue={lastNameUpdated} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>About me</Label>
                            <Input
                                type="text"
                                onChange={(e: any) => setUserBioUpdated(e.target.value)}
                                defaultValue={userBioUpdated}></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            onClick={updateUser}
                            className="btn-update"
                        >Update</Button>
                        <Button
                            color="danger"
                            onClick={() => props.setIsEditOpen(false)}
                        >Cancel</Button>
                    </ModalFooter>
                </Modal>}
        </div>
    )
}

export default UpdateProfile