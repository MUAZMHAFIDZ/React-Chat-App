import { useRef, useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { FiSend, FiUpload, FiLoader } from "react-icons/fi";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) {
      return;
    }
    const payload = {
      message: message.trim() || "",
      file: file || null,
    };
    await sendMessage(payload);
    setMessage("");
    setFile(null);
    fileInputRef.current.value = "";
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Simpan file ke state
      console.log("File selected:", selectedFile.name);
    }
  };

  return (
    <form
      className="row-span-1 flex justify-evenly w-full px-2"
      onSubmit={handleSubmit}
    >
      <input
        className="rounded-md px-2 mr-2 w-2/3 py-1 bg-slate-900 bg-opacity-75 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Send a Message..."
      />
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        onClick={handleFileUploadClick}
        className="cursor-custom bg-green-500 hover:bg-green-700 px-3 py-1 rounded-lg text-sm"
        type="button"
      >
        {loading ? <FiLoader className="animate-spin" /> : <FiUpload />}
      </button>
      <button
        className="cursor-custom bg-blue-500 hover:bg-blue-950 px-3 py-1 rounded-lg text-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? <FiLoader /> : <FiSend />}
      </button>
    </form>
  );
};
export default MessageInput;
