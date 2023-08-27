import { useState } from 'react'
import React from 'react'
import Login from './login.jsx'
import './App.css'
import Chats from './chats.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      
      <div>
        
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exa path='/chats' element={<Chats />}></Route>
        </Routes>
        
      </div>
      
    </Router>
  )
}

export default App
