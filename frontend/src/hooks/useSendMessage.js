import { useState } from "react"
import useConvertion from "../store/useConvertion"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConvertion} = useConvertion()

    const sendMessage = async (message) => {
        try {
            const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConvertion._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            })
            const data = await res.json()

            if(data.error) {
                throw new Error(data.error)
            }
            
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {sendMessage, loading}

}
export default useSendMessage