import React from 'react'
import { useSelectedUser } from '../../context/SelectedUserProvider'

function Chatuser() {
  const[selectedUser, setSelectedUser] = useSelectedUser();
  return (
    <div className='h-[8vh] flex space-x-3 justify-center items-center bg-gray-800 hover:bg-gray-700 duration-300' >
      <div className="avatar">
          <div className="w-10 ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
        <div>
            <h1 className='text-xl' >{selectedUser.fullname}</h1>
            <span className='text-sm' >Offline</span>
        </div>
    </div>
  )
}

export default Chatuser
