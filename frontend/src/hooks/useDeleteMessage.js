import { useState } from "react";
import useConversation from "../store/useConversation";
import { useSocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();
  const { socket } = useSocketContext();

  const deleteMessage = async (messageId) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/message/delete/${messageId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMessages(messages.filter((message) => message._id !== messageId));
        socket?.emit("deleteMessage", { messageId });
        toast.success("Message deleted successfully.");
      } else {
        throw new Error(data.error || "Failed to delete message.");
      }
    } catch (error) {
      console.error("DeleteMessage Error:", error);
      toast.error(
        error.message || "An error occurred while deleting the message."
      );
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading };
};

export default useDeleteMessage;
