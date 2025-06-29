import React from 'react'
import { useSelectedUser } from '../../context/SelectedUserProvider'
import { useLoading } from '../../context/LoadingProvider';

function User({user}) {
  //console.log(user);
  const [selectedUser, setselectedUser] = useSelectedUser();
  const[isLoading,setIsLoading] = useLoading();
  
  return (
      <div className="flex space-x-4 px-8 py-3  hover:bg-slate-700 duration-300 cursor-pointer" onClick={(e) => {
            setselectedUser(user);
            //console.log(user);
            setIsLoading(true);
          }} >
        <div className="avatar">
          <div className="w-12 ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
        <div>
            <h1 className='font-bold' >{user.fullname}</h1>
            <span>{user.email}</span>
        </div>
      </div>
  )
}

export default User
