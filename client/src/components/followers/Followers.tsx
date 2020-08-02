import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { FollowUserInterface } from '../../interfaces/FollowUserInterface'
import SingleFollowUser from '../single_follow_user/SingleFollowUser'

function Followers({ followersUsers, isFollowersOpen, setIsFollowersOpen }: any) {
    const followersUserList = followersUsers.map((followers: FollowUserInterface) => <SingleFollowUser following={followers} />)

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