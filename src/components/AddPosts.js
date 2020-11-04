import React, { useState, useContext } from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import ErrorsMessage from './ErrorsMessage';

function AddPosts() {

    //posts state
    const [post, setPost] = useState()

    const { setPostData } = useContext(UserContext)

    const [error, setError] = useState();
    const history = useHistory();


    const handleSubmit = async (e) => {

        e.preventDefault();
        let token = localStorage.getItem("auth-token")

        try {

            const newPost = { post }
            const postRes = await axios.post('https://bmw-api.herokuapp.com/api/posts', newPost, { headers: { 'x-auth-token': token }, });
            // function adds new post to exsisting posts
            const addPost = (post) => {
                setPostData([...post, postRes.data])
            }
            history.push('/');
            setPost("");
        }
        catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg)
            }

        }
    };

    return (
        <div className='page'>
            <h2>Post Question</h2>
            {{ error } && (<ErrorsMessage message={error} />)}

            <form className='formLayout' onSubmit={handleSubmit}>
                <textarea rows='10' cols='60' id='post' value={post} onChange={(e) => setPost(e.target.value)} placeholder='Add Question Here ......'></textarea>
                <input type='submit' value='Submit' />
            </form>
        </div>

    )
}

export default AddPosts
