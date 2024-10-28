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
    res.status(500).send({ message: error.message });
  }
};

// Get creator by ID  
export const getCreatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const creator = await Creator.findById(id).populate('images').populate('transactions');
    if (!creator) {
      return res.status(404).send({ message: "Creator not found" });
    }
    res.json(creator);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new creator  
export const createCreator = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role, numberOfIdeas, ideas } = req.body;

  try {
    const newCreator = new Creator({ name, email, password, role, numberOfIdeas, ideas });
    await newCreator.save();
    res.status(201).send(newCreator);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update creator by ID  
export const updateCreator = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCreator = await Creator.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCreator) {
      return res.status(404).send({ message: "Creator not found" });
    }
    res.status(200).send(updatedCreator);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Patch (partially update) creator by ID  
export const patchCreator = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCreator = await Creator.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCreator) {
      return res.status(404).send({ message: "Creator not found" });
    }
    res.status(200).send(updatedCreator);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete creator by ID  
export const deleteCreatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCreator = await Creator.findByIdAndDelete(id);
    if (!deletedCreator) {
      return res.status(404).send({ message: "Creator not found" });
    }
    res.status(200).send({ message: "Creator deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
