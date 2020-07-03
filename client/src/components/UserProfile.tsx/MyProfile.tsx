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
        userBio: 'Write something about yourself.'
    })
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [firstNameUpdated, setFirstNameUpdated] = useState('')
    const [lastNameUpdated, setLastNameUpdated] = useState('')
    const [userBioUpdated, setUserBioUpdated] = useState('')

    const { userID, setUserID } = useContext(AppContext)

    const editUser = () => {
        setIsEditOpen(true)
    }

    const updateUser = () => {
        setIsEditOpen(false)

        const updatedUser = {
            first_name: firstNameUpdated,
            last_name: lastNameUpdated,
            user_bio: userBioUpdated
        }

        Axios
            .put(`/api/users/${userID}`, updatedUser)
            .then(res => {
                //console.log('valja response', res.data)
                const user = res.data
                 setUserInfo({
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userBio: user.user_bio
                }) 
                //console.log('nije update-ano', userInfo)
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
                    userBio: user.user_bio
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="profile-container">
            <button className="btn-edit" onClick={editUser}>
                <i className="fa fa-edit"></i>
            </button>
            <div className="user-info">
                <div className="img-circular">
                    <img className="user-profile-img2" src={avatar}></img>
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
                            <Input type="file"></Input>
                        </FormGroup>
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
