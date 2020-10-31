import React,{useState,useContext,useEffect} from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import{useHistory} from 'react-router-dom'
import ErrorsMessage from './ErrorsMessage';

export default function Login(){
    const[username,setUsername] = useState(); 
    const[password,setPassword] = useState();
    const[error,setError]= useState();

    const{userData,setUserData} = useContext(UserContext)
    const history = useHistory();

    useEffect(() =>{
        if (userData.user) history.push('/');
    })

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try{
        const loginUser = {username,password}
        const loginRes = await axios.post('http://localhost:8080/api/login',loginUser)
    
        setUserData({
            token:loginRes.data.token,
            user:loginRes.data.username
        })
        localStorage.setItem('auth-token',loginRes.data.token)
        history.push('/');
        }
        catch(err){
            if(err.response.data.msg){
                setError(err.response.data.msg)
            }
        }
    }

    return (
        <div className='page'>
            <h2>Login</h2>
            {{error} && (<ErrorsMessage message={error}/>)}
            <form onSubmit={handleSubmit} className='formLayout'>
                <input id='user' placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}/>
                <input id='pass' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}