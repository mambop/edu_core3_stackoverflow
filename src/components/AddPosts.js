import React, { useState, useContext } from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import ErrorsMessage from './ErrorsMessage';

function AddPosts() {

     //post state
  const [post, setPost] = useState({
    post: undefined
   
  })
  const {setUserData } = useContext(UserContext)

    const [error, setError] = useState();
    const history = useHistory();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newPost = { post}
            const postData = await axios.post('http://localhost:8080/api/post', newPost);

        
            setPost({
                post: postData.data.post
        
            })

            history.push('/');
        }

        catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg)
            }

        }
    };
    return (
        <div className='page'>
            <h2>New Question</h2>
            {{ error } && (<ErrorsMessage message={error} />)}

            <form onSubmit={handleSubmit} className='formLayout'>
                <textarea rows='10' cols='60' id='post' onChange={(e) => setPost(e.target.value)} placeholder='Add Question Here ......'></textarea>
                <input type='submit' value='Submit' />
            </form>
        </div>

    )
}

export default AddPosts
