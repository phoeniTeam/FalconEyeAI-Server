import { body } from 'express-validator';

const creatorValidator = () => {
    return [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('name').not().isEmpty().withMessage('Name is required'),
    ];
};

export default creatorValidator