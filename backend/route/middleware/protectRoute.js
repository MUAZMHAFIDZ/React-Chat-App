import Jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = res.cookie.Jwt

        if(!token) {
            console.log("Error Unauthorized token : ", error.message)
            return res.status(401).json({
                error: "Unauthorized!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({
                error: "invalid token!"
            })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user) {
            return res.status(404).json({
                error: "User not Found!"
            })
        }

        req.user = user

        next()
    } catch (error) {
        console.log("Error Protect Route : ", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

export default protectRoute;