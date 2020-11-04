import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DisplayPosts from './DisplayPosts'
import UserContext from './UserContext'



function Home() {



    const { userData } = useContext(UserContext);
    const history = useHistory()


    // redirect none loggedin user 
    useEffect(() => {
        if (!userData.user) history.push('/login');
    });
    return (
        <DisplayPosts />
    )
}
export default Home; 
