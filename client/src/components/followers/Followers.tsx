import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import avatar from '../../assets/avatar.png'

interface FollowUser {
    first_name: string,
    last_name: string,
    profile_image: string
}
interface Props {
    followersUsers: Array<FollowUser>,
    isFollowersOpen: boolean,
    setIsFollowersOpen: any
}

function Followers(props: any) {
    const followersUserList = props.followersUsers.map((following: FollowUser) => {
        console.log(following)
        return (
            <div className="follower-user-container">
                <div className="img-comment-circular-mini" >
                    <img alt="avatar" className="user-photo-mini" src={following.profile_image === "" ? avatar : `http://localhost:5000/${following.profile_image}`}></img>
                </div>
                <h5 className="follow-user-name">{following.first_name} {following.last_name}</h5>
            </div>
        )
    })

    return (
        <div className="following-user-list">
            <Modal isOpen={props.isFollowersOpen} toggle={() => props.setIsFollowersOpen(!props.isFollowersOpen)}>
                <ModalHeader>Followers</ModalHeader>
                <ModalBody>{followersUserList}</ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => props.setIsFollowersOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Followers