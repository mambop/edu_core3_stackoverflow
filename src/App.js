import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddPosts from './components/AddPosts'
import UserContext from './components/UserContext'
import DisplayPosts from './components/DisplayPosts';



function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  const [postData, setPostData] = useState({
    post:undefined
  })

  const [commentData, setCommentData] = useState({
    comment:undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
//get logged in user
      if (token) {
        const userRes = await axios.get('http://localhost:8080/api/user',
          {
            headers: { 'x-auth-token': token },
          });

        setUserData({
          token,
          user: userRes.data
        })
//get posts of logged in user
      }
      if (token) {
        const postRes = await axios.get('http://localhost:8080/api/posts',
         {
          headers: { 'x-auth-token': token },
        });

        setPostData({

          post: postRes.data
        })

      }

//get comments logged in user
      if (token) {
        const commentRes = await axios.get('http://localhost:8080/api/comments',
         {
          headers: { 'x-auth-token': token },
        });

        setCommentData({

          comment: commentRes.data
        })

      }

    }
    checkLoggedIn();
  }, [])


  return (

    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider value={{ commentData, setCommentData}}>
      <UserContext.Provider value={{ postData, setPostData}}>
        <UserContext.Provider value={{ userData, setUserData }}>
   
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/post' component={AddPosts} />
            </Switch>
          </div>
        </UserContext.Provider>
        </UserContext.Provider>
        </UserContext.Provider>


      </BrowserRouter>
    </div> 
  );
}

export default App;
