import React, { useState, useEffect, useContext } from 'react'
import './myprofile.css'
import avatar from '../find_people/avatar.png'
import Axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'
import SinglePost from '../single_post/SinglePost'
import { AppContext } from '../context/AppContext'

function MyProfile() {

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        userBio: 'Write something about yourself.',
        userPhoto: ''
    })
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [firstNameUpdated, setFirstNameUpdated] = useState('')
    const [lastNameUpdated, setLastNameUpdated] = useState('')
    const [userBioUpdated, setUserBioUpdated] = useState('')

    const { userID, setUserID } = useContext(AppContext)

    const editUser = () => {
        setIsEditOpen(true)
    }

    const updateUser = (e: any) => {
        e.preventDefault()

        setIsEditOpen(false)

        const formData = new FormData()

        formData.append('fileImage', file)
        formData.append('first_name', firstNameUpdated)
        formData.append('last_name', lastNameUpdated)
        formData.append('user_bio', userBioUpdated)

        const config: any = { header: { "Content-Type": "multipart/form-data" } }

        console.log('filee', file)
        Axios
            .put(`/api/users/${userID}`, formData, config)
            .then(res => {
                //console.log('profile_imageee', res.data.profile_image)
                //console.log('fali profile_image', res.data.profile_image)
                console.log('responseee', res.data)
                const user = res.data
                 setUserInfo({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio,
                    userPhoto: user.profile_image
                }) 
            })
            .catch(err => console.log(err))
    }

    // get user data
    const storedToken = localStorage.getItem('token')
    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        Axios
            .get('/api/auth/user', config)
            .then(res => {
                console.log('response', res)
                const user = res.data.user
                setUserID(user._id)
                setUserInfo({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio,
                    userPhoto: user.profile_image
                })
            })
            .catch(err => console.log(err))
    }, [])



    // upload image
    const [file, setFile] = useState('')
    const [uploaded, setUploaded] = useState('')

    const handleImageUpload = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    };

    const onClickHandler = (e: any) => {
        const formData = new FormData()
        formData.append('fileImage', file)
        //console.log('file',file)

        Axios.post("/api/image", formData, {})
            .then(res => {
                //console.log(`UPLOADED: http://localhost:5000/${res.data.fileImage}`)
                setUploaded(`http://localhost:5000/${res.data.fileImage}`)
            })
            .catch(err => console.log(err))
    }

//console.log('image1',uploaded)
//console.log('photo',userInfo.userPhoto)
    
    return (
        <div className="profile-container">
            <button className="btn-edit" onClick={editUser}>
                <i className="fa fa-edit"></i>
            </button>
            <div className="user-info">
                <div className="img-circular">
                    <img className="user-profile-img2" src={userInfo.userPhoto}></img>
                </div>
                <p className="user-name">{userInfo.firstName} {userInfo.lastName}</p>
                <p className="about-user">{userInfo.userBio}</p>
            </div>
            <div className="user-posts">
                <p className="my-posts-title">My Posts</p>
            </div>
            {isEditOpen &&
                <Modal isOpen={isEditOpen} toggle={() => setIsEditOpen(!isEditOpen)} backdrop="static">
                    <ModalHeader>Update your profile</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Profile Image</Label>
                            <Input type="file" name="fileImage" onChange={handleImageUpload}></Input>
                        </FormGroup>
                        <Button onClick={onClickHandler}>Upload</Button>
                        <img src={uploaded} style={{width: "100px"}}></img>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" onChange={(e: any) => setFirstNameUpdated(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" onChange={(e: any) => setLastNameUpdated(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>About me</Label>
                            <Input type="text" onChange={(e: any) => setUserBioUpdated(e.target.value)}></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={updateUser}>Update</Button>
                        <Button color="danger" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>}
           {/* <SinglePost /> */}
        </div>
    )
}

export default MyProfile
