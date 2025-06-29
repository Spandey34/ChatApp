import React from 'react'
import { IoSend } from "react-icons/io5";

function Typesend() {
  return (
    <div className='flex space-x-2 h-[8vh] text-center items-center justify-center' >
        <div className='w-[70%]' >
      <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-2 flex items-center gap-2 w-full">
            <input type="text" placeholder="Search" className="grow outline-none rounded-md bg-slate-800" />
        </label>
    </div>
    <button><IoSend className='text-2xl' /></button>
    </div>
  )
}

export default Typesend
