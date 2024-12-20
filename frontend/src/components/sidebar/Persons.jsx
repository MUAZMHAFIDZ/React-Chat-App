import useGetConversation from "../../hooks/useGetConversation"
import Person from "./Person"

const Persons = ({handleButtonA}) => {
    const {loading, Conversations} = useGetConversation()

    return (
        <div className="overflow-x-hidden overflow-y-auto col-span-6 h-[55vh]">
            {Conversations.map((people, idx) => (
                <div onClick={() => handleButtonA(event)}>
                <Person 
                    key={people._id}
                    Conversation={people}
                />
                </div>
            ))}

            {loading ? <span>Loading...</span> : null}
        </div>
    )
}
export default Persons