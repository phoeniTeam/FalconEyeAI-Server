import Transaction from '../models/transactionSchema.js';
import { validationResult } from 'express-validator';
import Creator from "../models/creatorSchema.js";

export const createTransaction = async (stripeId, amount, plan, credits, creatorId) => {
    try {
        const transaction = new Transaction({
            stripeId,
            amount,
            plan,
            credits,
            creatorId,
        });

        await transaction.save();

        const updatedCreator = await Creator.findByIdAndUpdate(
            creatorId,
            { $inc: { creditBalance: credits } },
            { new: true }
        )

        if (!updatedCreator) {
            return res.status(404).send({ message: "Creator not found" });
        }


        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// export const createTransaction = async (req, res) => {
//     console.log('Request Body:', req.body);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.error('Validation errors:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { stripeId, amount, plan, credits, creatorId } = req.body;

//     try {
//         const transaction = new Transaction({
//             stripeId,
//             amount,
//             plan,
//             credits,
//             creatorId,
//         });

//         await transaction.save();
//         res.status(201).json({ message: 'Transaction created successfully', transaction });
//     } catch (error) {
//         console.error('Error saving transaction:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

export const getAllTransactions = async (req, res) => {
    const { creatorId } = req.query;

    try {
        let transactions;

        if (creatorId) {
            transactions = await Transaction.find({ creatorId });
        } else {
            transactions = await Transaction.find();
        }

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found" });
        }

        res.status(200).json({ data: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getTransactionById = async (req, res) => {
    const { id } = req.params;

    try {
        const transactions = await Transaction.findById(id);
        if (!transactions) return res.status(404).json({ message: 'Image not found' }, { transactionId: id });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};