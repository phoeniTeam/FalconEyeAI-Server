import { body } from 'express-validator';

export const imageValidationRules = () => [
  body('title').notEmpty().withMessage('Title is required'),
  body('transformationType').notEmpty().withMessage('Transformation type is required'),
  body('publicId').notEmpty().withMessage('Public ID is required'),
  body('secureURL').isURL().withMessage('Please provide a valid secure URL'),
  body('width').optional().isNumeric().withMessage('Width must be a number'),
  body('height').optional().isNumeric().withMessage('Height must be a number'),
  body('aspectRatio').optional().isString().withMessage('Aspect Ratio must be a string'),
  body('color').optional().isString().withMessage('Color must be a string'),
  body('prompt').optional().isString().withMessage('Prompt must be a string'),
  body('creator').optional().isMongoId().withMessage('Creator must be a valid MongoDB ObjectId')
];
