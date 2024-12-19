import bcrypt from "bcryptjs";
import User from "../models/User.js";
import tokenAndCookie from "../utils/getToken.js";

const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body

        if ( password !== confirmPassword) {
            return res.status(400).json({error: "password wrong!"})
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "username already exist!"})
        }

        //hash
        const gensalt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, gensalt);

        const newUser = new User({
            fullName, 
            username, 
            password: hashedPassword, 
            gender,
            photoProfile: ""
        })

        
        if(newUser) {
            // jwt
            tokenAndCookie(newUser._id, res)

            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                photoProfile: newUser.photoProfile
            })
        } else {
            res.status(400).json({error: "Invalid User Data!"})
        }

    } catch (error) {
        console.log("signin Error", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const passwordCorrect = await bcrypt.compare(password, user.password)

        if(!user || !passwordCorrect) {
            console.log("error in login : ", error.message)
            res.status(400).json({error: "Invalid Username or password!"})
        }

        tokenAndCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            photoProfile: user.photoProfile
        })

    } catch (error) {
        console.log("login Error", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

const logout = (req, res) => {
    try {

        res.cookie("jwt", "", {maxAge: 0})

        res.status(200).json({message: " Logged Out! "})

    } catch (error) {
        console.log("logout Error", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

export {signup, login, logout}