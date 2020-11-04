import React, { useState, useContext } from 'react'
import PostContext from './PostContext'
import CommentContext from './CommentContext'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import ErrorsMessage from './ErrorsMessage';

function AddComments() {

    //posts state
    const [comment, setComment] = useState()

    const { setCommentData } = useContext(CommentContext)


    const postData = useContext(PostContext)

    const [error, setError] = useState();
    const history = useHistory();

    const { postId } = useParams();
    const handleSubmit = async (e) => {

        e.preventDefault();
        let token = localStorage.getItem("auth-token")

        try {

            const newComment = { comment }
            const commentRes = await axios.post(`https://bmw-api.herokuapp.com/api/comments/:${postId}`, newComment, { headers: { 'x-auth-token': token }, });
            // function adds new comment to exsisting comments

            const addComment = (comment) => {
                setCommentData([...comment, commentRes.data])
            }
            history.push('/comment');
            setComment("");
        }
        catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg)
            }

        }
    };

    return (
        <div className='page'>
            <h2>Add Comment</h2>
            {{ error } && (<ErrorsMessage message={error} />)}

            <form className='formLayout' onSubmit={handleSubmit}>
                <textarea rows='10' cols='60' id='comment' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add Answer Here ......'></textarea>
                <input type='submit' value='Submit' />
            </form>
        </div>

    )
}

export default AddComments
