import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import User from './components/User'
import Register from './components/Register'
import Homepage from './components/Homepage'
import Edituser from './components/Edituser'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<User/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/homepage' element={<Homepage/>}></Route>
        <Route path='/editpage/:id' element={<Edituser/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App