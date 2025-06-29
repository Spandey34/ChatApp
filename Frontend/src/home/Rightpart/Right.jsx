import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'

function Right() {
  return (
    <div className='w-[70%] bg-slate-900 text-gray-300' >
      <Chatuser />
      <div style={{maxHeight: "calc(92vh - 8vh)"}} className='overflow-y-auto scrollbar-none' >
       <Messages /> 
      </div>
      <Typesend />
    </div>
  )
}

export default Right
