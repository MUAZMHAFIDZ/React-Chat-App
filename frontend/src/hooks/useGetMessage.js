import { useEffect, useState } from "react"
import useConvertion from "../store/useConvertion"
import toast from "react-hot-toast"

const useGetMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConvertion} = useConvertion()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`http://localhost:5000/api/messages/${selectedConvertion._id}`)

                const data = await res.json()

                if(data.error) {
                    throw new Error(data.error)
                }
                
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if(selectedConvertion._id) getMessages()
    }, [selectedConvertion?._id, setMessages])

    return {messages, loading}
}
export default useGetMessage