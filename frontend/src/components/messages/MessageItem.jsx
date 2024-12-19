import { useEffect } from 'react'
import useConversation from '../../store/useConversation'
import MessageInput from './MessageInput'
import './MessageItem.css'
import Messages from './Messages'
const MessageItem = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className="MessageBar">
            {!selectedConversation ? <NoChatSelected /> : 
                (<>  
                    <div className="Header">
                        <span className="To">To : </span><span className="Friend">{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>)
            }
            
        </div>
    )
}
export default  MessageItem

const NoChatSelected = () => {
    return (
        <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p style={{textAlign: "center", color: "cornflowerblue", fontSize: "25px"}}>Welcome Back name</p>
        </div>
    )
}