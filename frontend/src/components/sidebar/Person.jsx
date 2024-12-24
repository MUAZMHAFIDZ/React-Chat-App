import { useState } from "react";
import useConversation from "../../store/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Person = ({ Conversation, handleButtonA }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === Conversation._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(Conversation._id);

  return (
    <div onClick={() => handleButtonA(event)}>
      <div
        className={`${
          isSelected ? "bg-slate-400" : "bg-slate-800"
        } cursor-custom hover:bg-slate-500 p-1 flex flex-row items-center gap-2 my-1 rounded-md bg-opacity-35`}
        onClick={() => setSelectedConversation(Conversation)}
      >
        <div className="w-12 rounded-full overflow-hidden object-cover h-12">
          {Conversation.photoProfile !== "" ? (
            <img
              src={`http://localhost:5000/${Conversation.photoProfile}`}
              alt=""
            />
          ) : (
            <img src="test.jpeg" alt="" />
          )}
        </div>
        <span className={isOnline ? "text-lime-400" : "text-slate-100"}>
          {Conversation.fullName}
        </span>
      </div>
    </div>
  );
};
export default Person;
