import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="row-span-1 w-full px-2" onSubmit={handleSubmit}>
      <input
        className="rounded-md px-2 mr-2 w-2/3 py-1 bg-slate-900 bg-opacity-75 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Send a Message..."
      />
      <button
        className="cursor-custom bg-blue-800 hover:bg-blue-950 px-3 py-1 rounded-lg text-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? "..." : "send"}
      </button>
    </form>
  );
};
export default MessageInput;
