import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from './UserContext'

export default function RightNav() {

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const home = () => history.push('/');
    const newPost = () => history.push('/post');
    const logout = () => {
        setUserData({
            token:undefined,
            user:undefined
        });
        localStorage.setItem('auth-token','');
    };

    return (
        <nav className='NavLinks'>
    {/* checks if user exists */}
            {userData.user ?( 
                <>
            <button onClick={home}>Home</button>
            <button onClick={newPost}>New Post</button>   
            <button onClick={logout}>Logout</button>
                 </>
            ):(
                <>
                 <button onClick={register}>Register</button>
                 <button onClick={login}>Login</button> 
                 </>
            )}
        </nav>
    );
}
