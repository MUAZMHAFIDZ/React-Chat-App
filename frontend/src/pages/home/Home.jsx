import { useState } from "react";
import MessageItem from "../../components/messages/MessageItem";
import SideBar from "../../components/sidebar/SideBar";

const Home = () => {
  const [onMessage, setOnMessage] = useState(false);

  const handleButtonA = (e) => {
    e.preventDefault();
    setOnMessage(true);
  };

  const handleButtonB = (e) => {
    e.preventDefault();
    setOnMessage(false);
  };

  return (
    <div className="bg-slate-600 bg-opacity-85 w-full mx-3 rounded-lg md:w-full lg:w-2/3 p-2">
      <div className="grid md:grid-cols-3 gap-1">
        <SideBar handleButtonA={handleButtonA} onMessage={onMessage} />
        <MessageItem handleButtonB={handleButtonB} onMessage={onMessage} />
      </div>
    </div>
  );
};
export default Home;
