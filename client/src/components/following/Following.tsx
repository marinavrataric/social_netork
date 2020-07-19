import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'

interface FollowUser {
    first_name: string,
    last_name: string,
    profile_image: string,
    _id: string
}

interface Props {
    followingUsers: Array<FollowUser>,
    isFollowingOpen: boolean,
    setIsFollowingOpen: any
}

function Following(props: any) {
    const followingUserList = props.followingUsers.map((following: FollowUser) => {
        return (
            <div className="follower-user-container">
                <div className="img-comment-circular-mini">
                    <Link
                        to={{
                            pathname: `/userProfile/${following._id}`,
                            state: following,
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            alt="avatar"
                            className="user-photo-mini"
                            src={following.profile_image === "" ? avatar : `http://localhost:5000/${following.profile_image}`}
                        ></img>
                    </Link>
                </div>
                <h5 className="follow-user-name">{following.first_name} {following.last_name}</h5>
            </div>
        )
    })

    return (
        <div className="following-user-list">
            <Modal isOpen={props.isFollowingOpen} toggle={() => props.setIsFollowingOpen(!props.isFollowingOpen)}>
                <ModalHeader>Following users</ModalHeader>
                <ModalBody>{followingUserList}</ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => props.setIsFollowingOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Following