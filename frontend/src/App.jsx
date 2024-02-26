import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { useAuthContext } from './context/AuthContext.jsx'

function App() {
  const { authUser } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
