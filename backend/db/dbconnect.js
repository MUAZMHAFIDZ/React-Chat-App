import mongoose from "mongoose";

const dbconnect = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connect to database")
    } catch (err) {
        console.log("Error Connect database", err.message)
    }
}
export default dbconnect;