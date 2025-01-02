import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async ({ message = "", file = null }) => {
    try {
      const formData = new FormData();
      if (message) formData.append("message", message);
      if (file) formData.append("image", file);

      console.log("FormData:", formData);
      console.log("Message:", message);
      console.log("File:", file);

      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
