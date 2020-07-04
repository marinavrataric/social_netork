import React, { useState, useRef, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'
import Axios from 'axios'
import '../user_profile/myprofile.css'

function UpdateProfile(props: any) {

    const [firstNameUpdated, setFirstNameUpdated] = useState(props.userInfo.firstName)
    const [lastNameUpdated, setLastNameUpdated] = useState(props.userInfo.lastName)
    const [userBioUpdated, setUserBioUpdated] = useState(props.userInfo.userBio)

    const inputNameRef = useRef<HTMLInputElement | any>(null)

    useEffect(() => {
        console.log(inputNameRef.current, props.userInfo.firstName)
        inputNameRef.current && (inputNameRef.current.value = props.userInfo.firstName)
    }, [])

    // upload image
    const [file, setFile] = useState(props.userInfo.userPhoto)
    const [uploaded, setUploaded] = useState(props.userInfo.userPhoto)

    const handleImageUpload = (e: any) => {
        e.preventDefault();
        if (e.target && e.target.files) { setFile(e.target.files[0]) }
    };

    const onClickHandler = (e: any) => {
        const formData = new FormData()
        formData.append('fileImage', file)

        Axios.post("/api/image", formData, {})
            .then(res => {
                //console.log(`UPLOADED: http://localhost:5000/${res.data.fileImage}`)
                setUploaded(`http://localhost:5000/${res.data.fileImage}`)
            })
            .catch(err => console.log(err))
    }

    // update user
    const updateUser = (e: any) => {
        e.preventDefault()

        props.setIsEditOpen(false)

        const formData = new FormData()

        formData.append('fileImage', file)
        formData.append('first_name', firstNameUpdated)
        formData.append('last_name', lastNameUpdated)
        formData.append('user_bio', userBioUpdated)

        const config: any = { header: { "Content-Type": "multipart/form-data" } }

        Axios
            .put(`/api/users/${props.userID}`, formData, config)
            .then(res => {
                const user = res.data
                props.setUserInfo({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio,
                    userPhoto: user.profile_image
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
                            <Label>Profile Image</Label>
                            <Input
                                type="file"
                                name="fileImage"
                                onChange={handleImageUpload}
                            ></Input>
                        </FormGroup>
                        <Button
                            onClick={onClickHandler}
                            className="btn-upload-img"
                        >Upload file</Button>
                        <div className="inline">
                            <img src={file} style={{ width: "100px" }}></img>
                             
                        </div>
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