import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetMessage from "../../hooks/useGetMessage";
import useConversation from "../../store/useConversation";
import useListenMessage from "../../hooks/useListenMessage";
import { FiTrash } from "react-icons/fi";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessage();
  const lastMessage = useRef();
  const [onDelete, setOnDelete] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleDelete = (id) => {
    setOnDelete(id);
  };

  return (
    <div className="row-span-7 my-1 pb-1 bg-slate-400 bg-opacity-55 rounded-md h-[65vh] w-[90vw] md:w-full overflow-x-hidden overflow-y-auto px-2">
      {onDelete && (
        <div className="fixed z-10 top-0 right-0 left-0 bottom-0 px-4 flex justify-center items-center">
          <div className="bg-slate-500 border border-red-500 p-2 text-center w-full md:w-1/3 lg:w-1/5">
            <p>Permanent Delete ?</p>
            <div className="flex py-2 justify-evenly">
              <button className="rounded-md  bg-red-500 py-2 px-4">
                Delete
              </button>
              <button
                onClick={() => setOnDelete(null)}
                className="rounded-md  bg-blue-500 py-2 px-4"
              >
                No, Back
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessage}>
            <Message message={message} handleDelete={handleDelete} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageLoading key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">
          No Interact. Please Send your first Message!
        </p>
      )}
    </div>
  );
};
export default Messages;

const Message = ({ message, handleDelete }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const FromMe = message.senderId === authUser._id;

  return (
    <>
      {FromMe ? (
        <div className="flex justify-end group w-full">
          <div className="hidden px-1 items-center group-hover:flex">
            <button
              onClick={() => handleDelete(message._id)}
              className="cursor-custom"
            >
              <FiTrash />
            </button>
          </div>
          <div className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-blue-500 relative px-4 py-2 rounded-xl rounded-tr">
            {message.image && (
              <a
                href="./public/bgbymuaz.webp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="rounded-md my-1 cursor-custom"
                  src="./public/bgbymuaz.webp"
                  alt=""
                />
              </a>
            )}
            <p>{message.message}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start w-full">
          <div className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-green-500 relative px-4 py-2 rounded-xl rounded-tl">
            {message.image && (
              <a
                href="./public/bgbymuaz.webp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="rounded-md my-1 cursor-custom"
                  src="./public/bgbymuaz.webp"
                  alt=""
                />
              </a>
            )}
            <p>{message.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

const MessageLoading = () => {
  return (
    <div>
      <div className="flex justify-start">
        <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-green-500 relative px-4 rounded-md">
          ...................................
        </p>
      </div>
      <div className="flex justify-end">
        <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-blue-500 relative px-4 rounded-md">
          ...................................
        </p>
      </div>
    </div>
  );
};
