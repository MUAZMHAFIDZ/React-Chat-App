import mongoose from "mongoose";

const convertionSchema = new mongoose.Schema({
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },],
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }
}, {timestamps: true})

const Convertion = mongoose.model("Convertion", convertionSchema)

export default Convertion;