
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const DisplayComments = () => {

    const [posts, setPosts] = useState([]);

    const [comments, setComments] = useState([]);
    let token = localStorage.getItem("auth-token")
    const [error, setError] = useState();

    useEffect(() => {
        axios.get('https://bmw-api.herokuapp.com/api/comments', { headers: { 'x-auth-token': token } })

            .then(commentRes => {
                setComments(commentRes.data)
            })

            .catch(err => {
                console.log(err)
            })

    }, [])


    const commentList = comments.length ? (
        comments.map(comment => {
            return (

                <div className='card' key={comment._id}>
                    <div>
                        <span>{comment.comment}</span>
                        <p>Posted At: {comment.createdAt}</p>
                        <div className='card-body'>
                            <h3>{comment.comment}</h3>

                        </div>
                    </div>

                </div>
            )
        })
    ) : (
            <div>No Comments Yet</div>
        )

    return (
        <div>{commentList}</div>
    )


}
export default DisplayComments