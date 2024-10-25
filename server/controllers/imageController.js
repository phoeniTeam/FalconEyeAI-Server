import mongoose from 'mongoose';
import Creator from '../models/creatorSchema.js';
import Image from '../models/imageSchema.js';

// Create an image (Post)
export const createImage = async (req, res) => {
  const { title, transformationType, publicId, secureURL, width, height, config, transformationUrl, aspectRatio, color, prompt, creatorId } = req.body;

  try {
    const image = new Image({
      title, transformationType, publicId, secureURL, width, height, config,
      transformationUrl, aspectRatio, color, prompt, creatorId
    });
    await image.save();

    await Creator.findByIdAndUpdate(creatorId, { $push: { images: image._id } }, { new: true });

    res.status(201).json({ message: 'Image created successfully', image });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to create image' });
  }
};

// Get all images with pagination

export const getAllImages = async (req, res) => {
  const { limit = 20, page = 1 } = req.query;
  const options = {
    limit: parseInt(limit),
    skip: (page - 1) * limit,
  };

  try {
    const images = await Image.find({}, null, options)
      .populate('creatorId', 'name photo');

    const totalImages = await Image.countDocuments();

    res.status(200).json({
      totalImages,
      totalPages: Math.ceil(totalImages / limit),
      currentPage: parseInt(page),
      images,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 


// Get image by ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to retrieve image' });
  }
};

// Update an image
export const updateImage = async (req, res) => {
  const { title, transformationType, publicId, secureURL, width, height, config, transformationUrl, aspectRatio, color, prompt } = req.body;

  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { title, transformationType, publicId, secureURL, width, height, config, transformationUrl, aspectRatio, color, prompt },
      { new: true, runValidators: true }
    );

    if (!image) return res.status(404).json({ message: 'Image not found' });

    res.status(200).json({ message: 'Image updated successfully', image });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to update image' });
  }
};

// Patch an image by ID
export const patchImage = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedImage = await Image.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedImage) return res.status(404).json({ message: 'Image not found' });

    res.status(200).json({ message: 'Image updated successfully', image: updatedImage });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to patch image' });
  }
};

// Delete an image
export const deleteImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await Creator.updateMany({ images: id }, { $pull: { images: id } });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to delete image' });
  }
};
