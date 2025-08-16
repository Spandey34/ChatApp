import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import { useEffect } from "react";
import { useContext } from "react";

const socketContext = createContext();

//it is a hook
export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({children}) => {
    const[socket,setSocket] = useState(null);
    const[authUser,setAuthUSer] = useAuth();
    const[onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if(authUser)
        {
            const newSocket = io("https://chatapp-if9x.onrender.com",{
                query:{
                userId: authUser.user._id
            }
            });
            setSocket(newSocket);
            //console.log(newSocket);
            newSocket.on("getOnlineUsers", (users) => {
                  setOnlineUsers(users);
            } )
            return () => newSocket.close();
        }
        else
        {
            if(socket)
            {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return (
        <socketContext.Provider value={{socket, onlineUsers}} >
           {children}
        </socketContext.Provider>
    )
}