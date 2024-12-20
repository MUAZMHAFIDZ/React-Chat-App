import { useState } from 'react'
import useConversation from '../../store/useConversation'

const Person = ({Conversation}) => {
    const { selectedConversation, setSelectedConversation } = useConversation()

    const isSelected = selectedConversation?._id === Conversation._id
    
    return (
        <div className={`${isSelected?"bg-slate-400" : "bg-slate-800"} cursor-custom hover:bg-slate-500 p-1 flex flex-row items-center gap-2 my-1 rounded-md bg-opacity-35`} onClick={() => setSelectedConversation(Conversation)} >
            <div className="w-12 rounded-full overflow-hidden object-cover h-12">
                <img src={Conversation.photoProfile} alt="" />
            </div>
            <span>{Conversation.fullName}</span>
        </div>
    )
}
export default Person