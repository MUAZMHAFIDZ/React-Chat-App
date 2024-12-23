import { useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetMessage from "../../hooks/useGetMessage";
import useConversation from "../../store/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const lastMessage = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="row-span-7 my-1 pb-1 flex flex-col-reverse bg-slate-400 bg-opacity-55 rounded-md h-[65vh] w-full overflow-x-hidden overflow-y-auto px-2">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message ref={lastMessage} message={message} />
        ))}

      {loading && [...Array(3)].map((_) => <MessageLoading />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">
          No Interact. Please Send your first Message!
        </p>
      )}
    </div>
  );
};
export default Messages;

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const FromMe = message.senderId === authUser._id;

  return (
    <>
      {FromMe ? (
        <div className="flex justify-end">
          <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-blue-500 relative px-4 rounded-md">
            {message.message}
          </p>
        </div>
      ) : (
        <div className="flex justify-start">
          <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-green-500 relative px-4 rounded-md">
            {message.message}
          </p>
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
