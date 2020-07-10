import React from 'react'

interface Post {
    _id: string,
    content: string,
    registration_date: string,
    comments: [{
        text: string,
        userID: {
            first_name: string,
            last_name: string,
            profile_image: string,
            _id: string
        }
    }],
    likes: [string],
    userID: {
        first_name: string,
        last_name: string,
        profile_image: string,
        _id: string
    }
}

function FirstThreeComments(post: Post) {
    return post.comments.slice(0, 3).map((item: any) => {
        return (
            <div className="comment-container">
                <div className="img-comment-circular-mini">
                    <img alt='avatar' src={`http://localhost:5000/${item.userID.profile_image}`} className="user-photo-mini"></img>
                </div>
                <div className="comment-text-container">
                    <p className="text-bold">{item.userID.first_name} {item.userID.last_name}</p>
                    <p className="comment">{item.text}</p>
                </div>
            </div>
        )
    })
}

export default FirstThreeComments
