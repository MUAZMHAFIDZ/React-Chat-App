import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext.jsx"

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputerrors({fullName, username, password, confirmPassword, gender})

        if(!success) return;

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
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

    return {loading, signup};

}
export default useSignup

const handleInputerrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('fill all field!')
        return false;
    }
    if(password !== confirmPassword) {
        toast.error("confirm password not same!")
        return false
    }
    if(password.length < 6) {
        toast.error("password must be at least 6 character!")
        return false
    }
    return true
}