import { useState } from 'react'
import './sidebar.css'
import useConversation from '../../store/useConversation'

const Person = ({Conversation}) => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    const isSelected = selectedConversation?._id === Conversation._id
    
    return (
        <div className={`person ${isSelected?"personbg" : ""}`} onClick={() => setSelectedConversation(Conversation)} >
            <div className="avatar online">
                <img src={Conversation.photoProfile} alt="" />
            </div>
            <p>{Conversation.fullName}</p>
        </div>
    )
}
export default Person