import { useEffect } from 'react'
import useConvertion from '../../store/useConvertion'
import MessageInput from './MessageInput'
import './MessageItem.css'
import Messages from './Messages'
const MessageItem = () => {
    const {selectedConvertion, setSelectedConvertion} = useConvertion()

    useEffect(() => {
        return () => setSelectedConvertion(null)
    }, [setSelectedConvertion])

    return (
        <div className="MessageBar">
            {!selectedConvertion ? <NoChatSelected /> : 
                (<>  
                    <div className="Header">
                        <span className="To">To : </span><span className="Friend">{selectedConvertion.fullName}</span>
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