import { useState } from 'react'
import './MessageItem.css'
import useSendMessage from '../../hooks/useSendMessage'
const MessageInput = () => {
    const [message, setMessage] = useState("")
    const {loading, sendMessage} = useSendMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!message) {
            return;
        }
        await sendMessage(message)
        setMessage("")
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className='input' type="text" placeholder='Send a Message...' />
            <button type='submit' className='send' disabled={loading}>{loading ? "..." : "send"}</button>
        </form>
    )
}
export default MessageInput