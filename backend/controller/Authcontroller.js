import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import tokenAndCookie from "../utils/jwtoken.js";

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
        const gensalt = await bcrypt.genSalt(24); 
        const hashedPassword = await bcrypt.hash(password, gensalt);

        // user save
        // https://api.dicebear.com/7.x/adventurer/svg?skinColor=f2d3b1&hair=short01,short02,short03&seed=muaz
        // https://api.dicebear.com/7.x/adventurer/svg?skinColor=f2d3b1&hair=long01,long02,long03&seed=girl

        const boyPhoto = `https://api.dicebear.com/7.x/adventurer/svg?skinColor=f2d3b1&hair=short01,short02,short03,short04,short05,short06,short07,short08,short09,short16,short18,short14,short19&seed=${username}`
        const girlPhoto = `https://api.dicebear.com/7.x/adventurer/svg?skinColor=f2d3b1&hair=long01,long02,long03,long04,long05,long06,long07,long08,long09,long16,long18,long14,long19&seed=${username}`

        const newUser = new User({
            fullName, 
            username, 
            password: hashedPassword, 
            gender,
            photoProfile: gender == "male" ? boyPhoto : girlPhoto
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