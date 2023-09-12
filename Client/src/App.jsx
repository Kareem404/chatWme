import { useState } from 'react'
import React from 'react'
import Login from './login.jsx'
import './App.css'
import Chats from './chats.jsx'
import CreateAccount from './Create-account.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      
      <div>
        
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/chats' element={<Chats />}
              render={(props) => <Chats {...props} user_id={new URLSearchParams(props.location.search).get('id')} />}
          ></Route>
          <Route exact path = '/create-account' element={<CreateAccount />}></Route>
        </Routes>
        
      </div>
      
    </Router>
  )
}

export default App
