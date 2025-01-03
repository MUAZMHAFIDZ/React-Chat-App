import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket?.on("deleteMessage", ({ messageId }) => {
      setMessages(messages.filter((message) => message._id !== messageId));
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("deleteMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
