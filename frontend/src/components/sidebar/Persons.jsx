import useGetConversation from "../../hooks/useGetConversation";
import Person from "./Person";

const Persons = ({ handleButtonA }) => {
  const { loading, Conversations } = useGetConversation();

  return (
    <div className="overflow-x-hidden overflow-y-auto col-span-6 h-[60vh]">
      {Conversations.map((people, idx) => (
        <Person key={idx} Conversation={people} handleButtonA={handleButtonA} />
      ))}

      {loading ? <span>Loading...</span> : null}
    </div>
  );
};
export default Persons;
