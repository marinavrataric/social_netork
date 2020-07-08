import React, { useState } from 'react'
import Axios from 'axios';
import { Modal, FormGroup, Label, Input, Button, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

function UpdatePhoto(props: any) {

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


    const [msgError, setMsgError] = useState<null | string>(null)
    // update photo
    const updatePhoto = () => {

        const formData = new FormData()
        formData.append('fileImage', file)

        const config: any = { header: { "Content-Type": "multipart/form-data" } }
        Axios
            .put(`/api/users/${props.userID}/photo`, formData, config)
            .then(res => {
                const user = res.data
                props.setUserInfo({
                    ...props.userInfo,
                    userPhoto: user.profile_image
                })
                props.setIsPhotoModalOpen(false)
            })
            .catch(err => {
                setMsgError(`You have to choose and upload photo.`)
            })
    }

    return (
        <div>
            <Modal isOpen={props.isPhotoModalOpen} toggle={() => props.setIsPhotoModalOpen(!props.isPhotoModalOpen)} backdrop="static">
                {msgError && <Alert color="warning">{msgError}</Alert>}
                <ModalHeader>Update Photo</ModalHeader>
                <ModalBody>
                    <FormGroup>
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
                        <img src={uploaded} style={{ width: "100px" }}></img>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        className="btn-update-photo-success"
                        onClick={updatePhoto}
                    >Update</Button>
                    <Button
                        color="danger"
                        onClick={() => props.setIsPhotoModalOpen(false)}
                        className="btn-update-photo-cancel"
                    >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdatePhoto
