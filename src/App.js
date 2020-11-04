import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddPosts from './components/AddPosts'
import UserContext from './components/UserContext'
import PostContext from './components/PostContext'
import CommentContext from './components/CommentContext'
import DisplayComments from './components/DisplayComments';
import AddComments from './components/AddComments'


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined

  })

  const [postData, setPostData] = useState({
    post: undefined
  })

  const [commentData, setCommentData] = useState({
    comment: undefined
  })

  // const [post, setPost] = useState('')

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      //get logged in user
      if (token) {
        const userRes = await axios.get('https://bmw-api.herokuapp.com/api/user', { headers: { 'x-auth-token': token } })

        setUserData({
          token,
          user: userRes.data
          // id:userRes.data.id,
          // username:userRes.data.username
        });

      }

      //get posts of logged in user
      const addPost = (post) => {
        setPostData([...post,])
      }
      if (token) {
        const postRes = await axios.get('https://bmw-api.herokuapp.com/api/posts',
          {
            headers: { 'x-auth-token': token },
          });

        // const addPost = (post) =>{
        //   setPostData([...post,postRes.data])
        // }
        setPostData({

          post: postRes.data
        })

      }

      //get comments logged in user
      if (token) {
        const commentRes = await axios.get('https://bmw-api.herokuapp.com/api/comments',
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
        <CommentContext.Provider value={{ commentData, setCommentData }}>
          <PostContext.Provider value={{ postData, setPostData }}>
            <UserContext.Provider value={{ userData, setUserData }}>

              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/post' component={AddPosts} />
                  <Route path='/comment' component={DisplayComments} />

                  <Route path='/comments' component={AddComments} />
                </Switch>
              </div>
            </UserContext.Provider>
          </PostContext.Provider>
        </CommentContext.Provider>


      </BrowserRouter>
    </div>
  );
}

export default App;
