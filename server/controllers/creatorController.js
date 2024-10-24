import Creator from '../models/creatorSchema.js';
import { validationResult } from 'express-validator';

// sign-up new creator account
export const createCreator = async (req, res) => {
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



