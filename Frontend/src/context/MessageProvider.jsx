import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { useSelectedUser } from "./SelectedUserProvider";
import { useLoading } from "./LoadingProvider";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [authUser, setAuthUser] = useAuth();
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const[isLoading, setIsLoading] = useLoading();
  useEffect(() => {
    if (!selectedUser || !selectedUser._id) return;
    setIsLoading(true);
    //console.log(isLoading);
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://chatapp-if9x.onrender.com/api/message/get/${selectedUser._id}`
        );
        setChatMessages(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchMessages();
    //console.log(isLoading);
    setIsLoading(false);
  },[selectedUser, isLoading]);
  return (
    <MessageContext.Provider value={[chatMessages, setChatMessages]}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
