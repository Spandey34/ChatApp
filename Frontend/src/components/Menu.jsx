import React, { useState } from 'react'
import menu from "../assets/menu_icon.png";
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingProvider';

function Menu() {
    const[isLoading, setIsLoading] = useLoading();
    const navigate = useNavigate();
    const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("https://chatapp-rowq.onrender.com/api/user/logout")
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setIsLoading(false);
      alert("Logged Out Successfully!");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
    }
  }
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='relative py-2 group'>
          <img src={menu} alt="Menu" className='max-h-6 cursor-pointer' />
          <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border-gray-100 hidden group-hover:block' >
            <p onClick={() =>navigate('/profile')} className='cursor-pointer text-sm' >Edit Profile</p>
            <hr className='my-2 border-t border-gray-500' />
            <p className='cursor-pointer text-sm' onClick={handleLogout} >Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
