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
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token-key")
      if (token === null) {
        localStorage.setItem('token-key', '');
        token = '';
      }

      if (token) {
        const userRes = await axios.get('https://bmw-api.herokuapp.com/api/user',
          {
            headers: { 'x-auth-token': token },
          });

        setUserData({
          token,
          user: userRes.data
        })

      }

    }
    checkLoggedIn();
  }, [])


  return (

    <div className='App'>
      <BrowserRouter>
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

      </BrowserRouter>
    </div> 
  );
}

export default App;
