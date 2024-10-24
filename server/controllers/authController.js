import bcrypt from "bcrypt";
import Creator from "../models/creatorSchema.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const creatorExist = await Creator.findOne({ email });
    if (creatorExist)
      return res.status(400).json({ message: "Creator already exists" });

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS_BCRYPT)
    );
    const creator = new Creator({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await creator.save();
    res.status(201).json({ message: "Creator registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
  
      const creator = await Creator.findOne({ email });
      if (!creator) {
        return res.status(400).json({ message: 'Invalid credentials' });
      } 
  
  
      const isMatch = await bcrypt.compare(password, creator.password);
      if (!isMatch){
        return res.status(400).json({ message: 'Invalid credentials' });
      } 
  
  
      const token = jwt.sign({ id: creator._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
      res.status(200).json({ token, creator });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };