import Creator from "../models/creatorSchema.js";
import { body, validationResult } from "express-validator";

//
// const validatorRules = [
// body('name').notEmpty().withMessage('Name is required'),
// body('username').notEmpty().withMessage('Username is required'),
// body('email').custom(async value => {
//     const user = await Creator.findOne({ email: value });
//     if (user) {
//       throw new Error('E-mail already in use');
//     }
//   }),body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

// ]
// // sign-up new creator account
// export const createCreator =
// [
//     ...validatorRules,
// async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try{
//         const newCreator = new Creator({
//             name: req.body.name,
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password,
//         })
//         await newCreator.save();
//         res.status(201).json(newCreator);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }

// }

// ]

// // log in creator account
// export const loginCreator = async (req, res) => {
//     try{
//         const loginCreatorAccount = await Creator.findOne(
//             { email: req.body.email,
//                 password: req.body.password

//              });
//              if(!loginCreatorAccount){
//                  return res.status(400).json({msg: 'Invalid email address'});
//              }

//              if(req.body.password !== loginCreatorAccount.password){
//                  return res.status(400).json({msg: "invalid password"});
//              }
//              res.status(200).json({msg: 'Logged in successfully' ,creator: loginCreatorAccount});

//     }catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }

// }

//get all creators data

export const getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find();

    if (creators.length === 0) {
      return res.status(404).json({ msg: "No creators found" });
    }

    return res.status(200).json(creators);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};


//get creator  by id
export const getCreatorById = async (req, res) => {
  const id = req.params.id;
  try {
    const creator = await Creator.findById(id);
    if (!creator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.send(creator);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// update creator  by id
export const updateCreator = async (req, res) => {
  const id = req.params.id;
  try{
    const updatedCreator = req.body;
    const updatedCreatorAccount = await Creator.findByIdAndUpdate(
      id,
      updatedCreator,
      { new: true }
    );
    if (!updatedCreatorAccount) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.status(200).send(updatedCreatorAccount);;

  }catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
 
};


// delete creator by id
export const deleteCreatorById = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedCreator = await Creator.findByIdAndDelete(id);
        if (!deletedCreator) {
            return res.status(404).json({ msg: "Creator not found" });
        }
        res.status(200).send(deletedCreator);;


    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}