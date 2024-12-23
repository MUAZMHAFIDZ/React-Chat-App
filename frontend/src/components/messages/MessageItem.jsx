import { useEffect } from 'react'
import useConversation from '../../store/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { useAuthContext } from '../../context/AuthContext'
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
    const {authUser} = useAuthContext()
    return (
        <div className='h-full flex justify-center items-center overflow-x-clip'>
            <p className='text-center text-transparent bg-clip-text bg-gradient-to-r text-3xl from-blue-400 via-purple-400 to-lime-400'>
                Welcome Back {authUser.fullName}
                </p>
        </div>
    )
}