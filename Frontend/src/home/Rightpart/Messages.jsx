import React from "react";
import Message from "./Message";
import { useSelectedUser } from "../../context/SelectedUserProvider";
import { useMessage } from "../../context/MessageProvider";

function Messages() {
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const [chatMessages, setChatMessages] = useMessage();
  return (
    <div style={{minHeight: "calc(92vh - 8vh)"}}>
      {
        chatMessages.map((message,index) =>{
          return <Message key={index} user={message.senderId === selectedUser._id ? "receiver" : "sender"} message={message.message} time={new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} />
        })
      }
    </div>
  );
}

export default Messages;
