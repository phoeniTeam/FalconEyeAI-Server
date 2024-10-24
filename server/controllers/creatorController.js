import Creator from '../models/creatorSchema.js';
import { body, validationResult } from 'express-validator';


//
const validatorRules = [
body('name').notEmpty().withMessage('Name is required'),
body('username').notEmpty().withMessage('Username is required'),
body('email').custom(async value => {
    const user = await Creator.findOne({ email: value });
    if (user) {
      throw new Error('E-mail already in use');
    }
  }),body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

]
// sign-up new creator account
export const createCreator = 
[
    ...validatorRules,
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const newCreator = new Creator({
            name: req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        })
        await newCreator.save();
        res.status(201).json(newCreator);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
   

   
}


]
