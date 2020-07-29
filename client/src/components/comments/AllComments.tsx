import React from 'react'
import Axios from 'axios'
import { PostInterface } from '../../interfaces/PostInterface';
import SingleComment from './SingleComment';
import { config } from '../../constants/generalConstants';

function AllComments(post: PostInterface) {
    const deleteComment = (commentId: any) => {
        const postId = post._id
        Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config)
    }

    return post.comments.map((item: any) => <SingleComment item={item} deleteComment={deleteComment}/>)
}

export default AllComments