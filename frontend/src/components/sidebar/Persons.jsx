import useGetConversation from "../../hooks/useGetConversation"
import Person from "./Person"
import './sidebar.css'

const Persons = () => {
    const {loading, Conversations} = useGetConversation()

    return (
        <div className="persons">
            {Conversations.map((people, idx) => (
                <Person 
                    key={people._id}
                    Conversation={people}
                />
            ))}
            
            {loading ? <span>Loading...</span> : null}
        </div>
    )
}
export default Persons