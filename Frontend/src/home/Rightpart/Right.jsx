import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import { useMessage } from '../../context/MessageProvider'
import ChatStart from '../../components/ChatStart'
import { useLoading } from '../../context/LoadingProvider'
import Loading from '../../components/Loading'

function Right() {
  const[chatMessages, setChatMessages] = useMessage();
  const[isLoading, setIsLoading] = useLoading();
  return (
    (isLoading===false ? <div className='w-[70%] bg-slate-900 text-gray-300' >
      <Chatuser />
      <div style={{maxHeight: "calc(92vh - 8vh)"}} className='overflow-y-auto scrollbar-none' >
        {
          chatMessages.length!==0 ? <Messages /> : <ChatStart />
        }
        
      </div>
      <Typesend />
    </div> : <Loading />)
    
  )
}

export default Right
