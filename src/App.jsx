import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './Error'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Todo from './Todo'
import ProtectedRoute from './ProtectedRoute'
import toast, { Toaster } from 'react-hot-toast';


const isLoggin = localStorage.getItem('token')

function App() {
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center px-4">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />}/> 
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />}/>
          <Route path="login" element={<Login />}/>
          <Route path="todo" element={
            <ProtectedRoute isLoggin={isLoggin}>
              <Todo />
            </ProtectedRoute>
          }/>
          </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  )
}
export default App
