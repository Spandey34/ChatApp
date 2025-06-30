import React from "react";
import User from "./User";
import UseGetAllUsers from "../../context/UseGetAllUsers";
import { useSocketContext } from "../../context/SocketContext";

function Users() {
  const [allUsers, loading] = UseGetAllUsers();
  const {socket, onlineUsers} = useSocketContext();
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className="py-2 overflow-y-auto scrollbar-none" style={{maxHeight: "calc(84vh - 10vh)"}}>
        {allUsers.map((user,index) => (
          <User key={index} user={user} status={onlineUsers.includes(user._id) ? true : false} />
        ))}
      </div>
    </div>
  );
}

export default Users;
