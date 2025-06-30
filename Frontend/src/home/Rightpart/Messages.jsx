import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useSelectedUser } from "../../context/SelectedUserProvider";
import { useMessage } from "../../context/MessageProvider";
import useGetSocketMessage from "../../context/useGetSocketMessage";

function Messages() {
  const [selectedUser] = useSelectedUser();
  const [chatMessages] = useMessage();
  const lastMsgRef = useRef();
  useGetSocketMessage();//Listening to incoming messages
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // delay to ensure DOM is updated

    // Cleanup timeout if component unmounts before it fires
    return () => clearTimeout(scrollTimeout);
  }, [chatMessages]);

  return (
    <div
      style={{
        minHeight: "calc(92vh - 8vh)",
        maxHeight: "calc(92vh - 8vh)",
        overflowY: "auto",
        padding: "0.5rem"
      }}
    >
      {chatMessages.map((message, index) => {
        const isLast = index === chatMessages.length - 1;
        return (
          <div key={index} ref={isLast ? lastMsgRef : null}>
            <Message
              user={message.senderId === selectedUser._id ? "receiver" : "sender"}
              message={message.message}
              time={new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
