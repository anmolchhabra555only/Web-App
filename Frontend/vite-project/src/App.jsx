import React from 'react'
import {Routes, Route} from 'react-router-dom' 
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>
        
        
    </div>
  )
}

export default App
