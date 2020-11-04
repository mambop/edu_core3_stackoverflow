import React, { useState, useContext } from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import ErrorsMessage from './ErrorsMessage';

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext)
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newUsername = { username, password, passwordCheck }
            await axios.post('https://bmw-api.herokuapp.com/api/register', newUsername);

            const loginData = { username, password }
            const loginRes = await axios.post('https://bmw-api.herokuapp.com/api/login', loginData);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.username
            })
            localStorage.setItem('auth-token', loginRes.data.token)
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
            <h2>Register</h2>
            {{ error } && (<ErrorsMessage message={error} />)}

            <form onSubmit={handleSubmit} className='formLayout'>
                <input id='user' placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)} />
                <input id='pass' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <input placeholder='Re-enter Password' type='password' onChange={(e) => setPasswordCheck(e.target.value)} />
                <input type='submit' value='Register' />
            </form>
        </div>
    )
}