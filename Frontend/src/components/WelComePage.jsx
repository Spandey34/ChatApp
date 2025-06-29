import React from 'react'
import { useAuth } from '../context/AuthProvider'

function WelComePage() {
  const[authUser,setAuthUser] = useAuth();
  return (
    <div className='flex flex-col p-3 items-center justify-center w-[70%] bg-slate-900 text-gray-300' >
      <h1 className=' ' >Hello  <span className='font-bold text-blue-700' >{authUser.user.fullname}</span>!</h1>
      <br />
      <h2>No chat selected, please start conversation by selecting anyone to your contacts</h2>
    </div>
  )
}

export default WelComePage
