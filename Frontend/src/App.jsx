import React from 'react'
import Left from './home/Leftpart/Left'
import Right from './home/Rightpart/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import  { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'
import Loading from './components/Loading'
import { useSelectedUser } from './context/SelectedUserProvider'
import WelComePage from './components/WelComePage'
import ProfileUploader from './components/ProfileUploader'

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [selectedUser,setSelectedUser] = useSelectedUser();
  return (
      <Routes>
        <Route path='/' element={
          authUser ? (
            <div className='flex h-screen' >
              <Left />
              {selectedUser ? <Right /> : <WelComePage /> }
              
            </div>
          ) : <Navigate to={"/login"} />
        } />
        <Route path='/signup' element={ authUser ? <Navigate to={"/"} /> : <Signup />} />
        <Route path='/login' element={ authUser ? <Navigate to={"/"} /> : <Login />}  />
        <Route path='/profile' element={ authUser ? <ProfileUploader /> : <Login />}  />
      </Routes>
    //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <ProfileUploader />
    // </div>
    //<Menu />
  )
}

export default App
