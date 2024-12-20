import { useEffect } from 'react'
import useConversation from '../../store/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
const MessageItem = ({handleButtonB, onMessage}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className={`${onMessage ? "" : "hidden"} md:grid-rows-9 md:col-span-2 md:block`}>
            {!selectedConversation ? <NoChatSelected /> : 
                (<>  
                    <div className="row-span-1 px-2 text-blue-400">
                        <button onClick={() => handleButtonB(event)} className='bg-blue-800 py-1 text-sm px-3 mr-2 md:hidden'><span>{"Back"}</span></button>
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