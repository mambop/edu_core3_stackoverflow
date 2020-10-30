import React,{useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import DisplayPosts from './DisplayPosts'
import UserContext from './UserContext'


function Home () {
    const{userData} = useContext(UserContext);
    const history = useHistory()

    useEffect(() =>{
        if(!userData.token){
            history.push('/login');
        }
      
    })

    return (
        <div className="home-container page">
            <div className='posts'><DisplayPosts/></div>
        </div>
    )
}

export default Home
