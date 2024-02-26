import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const login = async (username, password) => {
        const succes = handleInputerrors(username, password)
        if(!succes) {
            return;
        }

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username, password})
            })

            const data = await res.json()

            if(data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))

            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {login, loading}
}
export default useLogin

const handleInputerrors = ({username, password}) => {
    if(!username || !password) {
        toast.error('fill all field!')
        return false;
    }
    if(password.length < 6) {
        toast.error("password must be at least 6 character!")
        return false
    }
    return true
}