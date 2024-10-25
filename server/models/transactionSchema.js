import mongoose, { Schema } from "mongoose";


const transactionSchema = new Schema({
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    plan: {
        type: String,
    },
    credits: {
        type: Number,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "Creator",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.model('Transaction', transactionSchema)


