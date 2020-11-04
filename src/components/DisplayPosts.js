import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'


function DisplayPosts() {

    const [posts, setPosts] = useState([]);



    let token = localStorage.getItem("auth-token")
    const [error, setError] = useState();

    const { postId } = useParams();

    useEffect(() => {
        axios.get('https://bmw-api.herokuapp.com/api/posts', { headers: { 'x-auth-token': token } })

            .then(postRes => {
                setPosts(postRes.data)

            })

            .catch(err => {
                console.log(err)
            })
    }, [])

    const deletePost = (id) => {

        axios.delete('https://bmw-api.herokuapp.com/api/deletepost/:postId', { headers: { 'x-auth-token': token } })

            .then(deleteRes => {
                setPosts(deleteRes.data)
                console.log(deleteRes.data)
                alert(id)
            })
            .catch(err => {
                console.log(err)
            })

    }
    const postList = posts.length ? (
        posts.map(post => {
            return (
                <Link to='comment'>
                    <div className='card' key={post._id}>
                        <div>
                            <h3>{post.post}</h3>
                            <p>Posted At : {post.createdAt}</p>
                            <div className='card-body'>
                                <p>
                                    <Link to='#' className='likes'>Likes</Link>
                                    <>|</>
                                    <Link to='/' className='likes' onClick={() => deletePost(postId)}>Delete</Link>
                                    <>|</>

                                    <Link to={'/comments/' + post._id} className='comment'>Comment</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    ) : (
            <div>No Posts Yet</div>
        )

    return (
        <div>{postList}</div>
    )

}

export default DisplayPosts
