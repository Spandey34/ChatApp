import React from "react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelectedUser } from "../../context/SelectedUserProvider";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useMessage } from "../../context/MessageProvider";
function Typesend() {
  const [chat, setChat] = useState("");
  const [selectedUser, setSelectedUser] = useSelectedUser();
  const [authUser, setAuthUser] = useAuth();
  const [chatMessages, setChatMessages] = useMessage();
  const handleSubmit = async (req, res) => {
    try {
      const receiverId = selectedUser._id;

      await axios.post(`/api/message/send/${receiverId}`, { message: chat });

      const res = await axios.get(`/api/message/get/${receiverId}`);
      setChatMessages(res.data);

      setChat("");
    } catch (error) {
      console.log("Error in sending Message! " + error);
    }
  };
  return (
    <div className="flex space-x-2 h-[8vh] text-center items-center justify-center">
      <div className="w-[70%]">
        <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-2 flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Message Here"
            className="grow outline-none rounded-md bg-slate-800"
            value={chat}
            onChange={(e) => {
              setChat(e.target.value);
            }}
           onKeyDown={(e) => {
    if (e.key === "Enter" && chat.trim()) {
      handleSubmit(); 
    }
  }} />
        </label>
      </div>
      <button onClick={handleSubmit}  >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
}

export default Typesend;
