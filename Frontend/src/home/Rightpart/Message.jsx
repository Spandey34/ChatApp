import React from "react";

function Message({ user, message, time }) {
  return (
    <div>
      <div className="p-2">
        {user === "sender" ? (
          <>
            <div className="chat chat-end">
              <div className="flex flex-col justify-start items-start chat-bubble chat-bubble-accent">
                {message}
                <span className=" text-blue-900 text-sm " >{time}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`chat chat-start`}>
              <div className="flex flex-col justify-start items-start chat-bubble chat-bubble-primary">
                {message}
                <span className=" text-blue-900 text-sm " >{time}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
