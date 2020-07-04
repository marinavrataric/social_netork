import React, { useState, useEffect, useContext } from 'react'
import './singlePost.css'
import Axios from 'axios'
import { AppContext } from '../context/AppContext'
import { PostContext } from '../posts/PostContext'

function SinglePost() {

    const [like, setLike] = useState(0)
    const [userInfoData, setuserInfoData] = useState({
        firstName: '',
        lastName: ''
    })

    const storedToken = localStorage.getItem('token')

    const { allPosts, setAllPosts } = useContext(PostContext)

    const handleLike = () => {
        setLike(like + 1)
        if (like === 1) {
            setLike(0)
        }
    }

    // delete post
    const handleDelete = (id: any) => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        Axios
            .delete(`/api/posts/${id}`, config)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    // get user data
    useEffect(() => {
        const config = {
            headers: { "x-auth-token": `${storedToken}` }
        }
        Axios
            .get('/api/auth/user', config)
            .then(res => {
                setuserInfoData({
                    firstName: res.data.user.first_name,
                    lastName: res.data.user.last_name
                })
            })
            .catch(err => console.log(err))
    }, [])

    // get all posts
    const postArray = allPosts.map((post: { content: String, _id: number }) => {
        return (
            <div className="single-post-container">
                <div className="right-align">
                    <button className="btn btn-delete" onClick={() => handleDelete(post._id)}>
                        <i className="fa fa-remove"></i>
                    </button>
                </div>
                <div className="left-align">
                    <p className="user-name-post">{userInfoData.firstName} {userInfoData.lastName}</p>
                    <p className="user-post">{post.content}</p>
                    <div className="buttons">
                        <button className="btn btn-like" onClick={handleLike}>
                            <p className="number-of-likes">{like}</p><i className="fa fa-thumbs-up" aria-hidden="true"></i>
                        </button>
                        <button className="btn btn-comment">
                            <i className="fa fa-comment" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {postArray}
        </div>
    )
}

export default SinglePost