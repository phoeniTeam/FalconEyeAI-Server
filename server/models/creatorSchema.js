import mongoose, { Schema } from "mongoose";


const creatorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        trim: true,
    },
    planId: {
        type: Number,
        default: 1,
        trim: true,
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Image'
        }
    ],
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'
        }
    ],
    creditBalance: {
        type: Number,
        default: 10,
        trim: true,

    },


})

export default mongoose.model('Creator', creatorSchema);