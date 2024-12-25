import { useState } from "react";
import useConversation from "../../store/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
import { FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const SearchPerson = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { Conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Must 3 characters long or more!");
    }

    const conversation = Conversations?.find((c) =>
      c.fullName?.toLowerCase().includes(search?.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("no such user found!!");
  };

  return (
    <div className="col-span-2 grid grid-cols-12">
      <form onSubmit={handleSubmit} className="col-span-11">
        <input
          className="bg-slate-800 bg-opacity-40  w-5/6 p-1"
          type="text"
          placeholder="Search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="m-1 rounded-full bg-gradient-to-r from-blue-600 to-green-600 my-2 p-2 cursor-custom"
        >
          <FiSearch />
        </button>
      </form>
      <Link className="col-span-1" to={"/setting"}>
        <FiSettings />
      </Link>
    </div>
  );
};
export default SearchPerson;
