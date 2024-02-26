import { useEffect, useState } from "react";
import toast from "react-hot-toast"

const useGetConvertion = () => {
    const [loading, setLoading] = useState(false)
    const [convertions, setConvertions] = useState([])

    useEffect(() => {
        const getConvertions = async () => {
            setLoading(true)
            try {
                const res = await fetch("http://localhost:5000/api/users")
                const data = await res.json()
                if(data.error) {
                    throw new Error(data.error)
                }

                setConvertions(data)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getConvertions()
    },[])
    return { loading, convertions }
}

export default useGetConvertion