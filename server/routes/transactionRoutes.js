import express from "express";
import { createTransaction, getAllTransactions, getTransactionById } from "../controllers/transactionController.js";
import { transactionValidationRules } from "../validators/transactionValidator.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, transactionValidationRules(), createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', authMiddleware, getTransactionById);

export default router;