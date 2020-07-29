import React from 'react'
import Axios from 'axios';
import { PostInterface } from '../../interfaces/PostInterface';
import SingleComment from './SingleComment';
import { config } from '../../constants/generalConstants';

function FirstThreeComments(post: PostInterface) {
    const deleteComment = (commentId: string) => {
        const postId = post._id
        Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)
    }
    const numberOfCommentsToDisplay = 3

    return post.comments.slice(0, numberOfCommentsToDisplay).map((item: any) => <SingleComment item={item} deleteComment={deleteComment} />)
}

export default FirstThreeComments
