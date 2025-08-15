import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa"
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import Cookies from 'js-cookie'

function Logout() {
  const[loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://chatapp-rowq.onrender.com/api/user/logout")
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      alert("Logged Out Successfully!");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
    }
  }
  return (
    <div className='h-[10vh]' >
        <div>
           <CiLogout className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-3' onClick={handleLogout} /> 
        </div>
       
    </div>
  )
}

export default Logout
