import React from 'react'
import { useSelectedUser } from '../../context/SelectedUserProvider'
import { useSocketContext } from '../../context/SocketContext';

function Chatuser() {
  const[selectedUser, setSelectedUser] = useSelectedUser();
  const {socket, onlineUsers} = useSocketContext();
  const status = onlineUsers.includes(selectedUser._id);
  return (
    <div className='h-[8vh] flex space-x-3 justify-center items-center bg-gray-800 hover:bg-gray-700 duration-300' >
      <div className="avatar relative">
          <div className="w-10 ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            <div className={`absolute top-0 right-0 h-2 w-2 ${status ? "bg-green-500" : "bg-red-600"} rounded-full ring-2 ring-white`} ></div>
          </div>
        </div>
        <div>
            <h1 className='text-xl' >{selectedUser.fullname}</h1>
            <span className='text-sm' >{status ? "Online" : "Offline"}</span>
        </div>
    </div>
  )
}

export default Chatuser
