import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { FollowUserInterface } from '../../interfaces/FollowUserInterface'

function Followers({followersUsers, isFollowersOpen, setIsFollowersOpen}: any) {
    const followersUserList = followersUsers.map((followers: FollowUserInterface) => {
        return (
            <div className="follower-user-container">
                <div className="img-comment-circular-mini" >
                    <Link
                        to={{
                            pathname: `/userProfile/${followers._id}`,
                            state: followers,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            alt="avatar"
                            className="user-photo-mini"
                            src={followers.profile_image === "" ? avatar : `http://localhost:5000/${followers.profile_image}`}
                        ></img>
                    </Link>
                </div>
                <h5 className="follow-user-name">{followers.first_name} {followers.last_name}</h5>
            </div>
        )
    })

    return (
        <div className="following-user-list">
            <Modal isOpen={isFollowersOpen} toggle={() => setIsFollowersOpen(!isFollowersOpen)}>
                <ModalHeader>Followers</ModalHeader>
                <ModalBody>{followersUserList}</ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => setIsFollowersOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Followers