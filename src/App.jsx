import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Todo from './Todo'
import Home from './Home'

function App() {
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center px-4">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/todo" element={<Todo />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
