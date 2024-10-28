import Creator from "../models/creatorSchema.js";
import { validationResult } from "express-validator";

// Get all creators
export const getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find().populate('images').populate('transactions');
    if (creators.length === 0) {
      return res.status(404).json({ msg: "No creators found" });
    }
    return res.status(200).json(creators);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

// Get a creator by ID
export const getCreatorById = async (req, res) => {
  const id = req.params.id;
  try {
    const creator = await Creator.findById(id).populate('images').populate('transactions');
    if (!creator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.json(creator);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Create a new creator
export const createCreator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, username, email, password, photo, planId, images, transactions, creditBalance } = req.body;
    const newCreator = new Creator({
      name,
      username,
      email,
      password,
      photo,
      planId,
      images,
      transactions,
      creditBalance
    });

    await newCreator.save();
    res.status(201).json(newCreator);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update creator by ID
export const updateCreator = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCreator = await Creator.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.status(200).json(updatedCreator);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Partially update creator by ID
export const patchCreator = async (req, res) => {
  const id = req.params.id;
  try {
    const patchedCreator = await Creator.findByIdAndUpdate(id, req.body, { new: true });
    if (!patchedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.status(200).json(patchedCreator);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete creator by ID
export const deleteCreatorById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCreator = await Creator.findByIdAndDelete(id);
    if (!deletedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.status(200).json({ msg: "Creator deleted successfully", deletedCreator });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
