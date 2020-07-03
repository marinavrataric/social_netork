import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'reactstrap'
import Axios from 'axios'
import SinglePost from '../single_post/SinglePost'
import { AppContext } from '../context/AppContext'
import './posts.css'

function Posts() {

    const [inputText, setInputText] = useState('')

    const storedToken = localStorage.getItem('token')
    const config: any = {
        headers: {
            "x-auth-token": `${storedToken}`,
            'Content-Type': 'application/json'
        }
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        const postData = {
            content: inputText
        }
        // create post
        Axios
            .post('/api/posts', postData, config)
            .then(res => {
                console.log('Created post: ', res.data)
            })
            .catch(err => console.log(err))
    }

    const { setPosts } = useContext(AppContext)

    // get all posts
    useEffect(() => {
        Axios
            .get('/api/posts', config)
            .then(res => {
                console.log(res.data)
                //setAllPosts(res.data)
                //fun(res.data)
                //setPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="center-post-div">
            <input
                type="text"
                className="input-post-text"
                onChange={(e: any) => setInputText(e.target.value)}
                placeholder="What is on your mind?"
            />
            <button onClick={handleClick} className="btn-submit-post">Submit</button>
            <div className="all-posts">
                <p className="title-post">Recently posted</p>
                <SinglePost />
            </div>
        </div>
    )
}

export default Posts
