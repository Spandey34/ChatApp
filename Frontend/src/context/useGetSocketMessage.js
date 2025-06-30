import React from 'react'
import { useSocketContext } from './SocketContext'
import { useMessage } from './MessageProvider';
import { useEffect } from 'react';

const useGetSocketMessage = () => {
    const {socket} = useSocketContext();
    const [chatMessages, setChatMessages] = useMessage();

    useEffect(() => {
        socket.on("newMessage", (newMessage)=>{
            setChatMessages([...chatMessages,newMessage]);
        })
        return () => {
            socket.off("newMessage");
        }
    },[socket,chatMessages,setChatMessages])
}

export default useGetSocketMessage
