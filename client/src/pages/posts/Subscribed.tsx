import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import SinglePost from '../../components/single_post/SinglePost';

function Subscribed() {
    const [subscribedPost, setSubscribedPost] = useState()

    // get all posts
    const storedToken = localStorage.getItem('token');
    const config: any = {
        headers: {
            'x-auth-token': `${storedToken}`,
            'Content-Type': 'application/json',
        }
    }
    useEffect(() => {
        Axios.get('/api/posts/subscribedPost', config)
            .then((res) => setSubscribedPost(res.data))
            .catch((err) => console.log(err));
    }, [config]);
    
    return (
        <div className="center-post-div">           
            <div className="all-posts">
                <SinglePost updatedPosts={subscribedPost} />
            </div>
        </div>
    )
}

export default Subscribed
