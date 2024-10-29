import { body } from 'express-validator';

export const transactionValidationRules = () => {
    return [
        body('stripeId').notEmpty().withMessage('Stripe ID is required'),
        body('amount').isNumeric().withMessage('Amount must be a number'),
        body('plan').optional().isString().withMessage('Plan must be a string'),
        body('credits').optional().isNumeric().withMessage('Credits must be a number'),
        body('creatorId').isMongoId().withMessage('Invalid buyer ID').optional()
    ];
};