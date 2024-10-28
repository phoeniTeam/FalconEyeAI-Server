import express from 'express';
import { creatorValidationRules } from '../validators/creatorValidator.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCreator, deleteCreatorById, getAllCreators, getCreatorById, patchCreator, updateCreator } from '../controllers/creatorController.js';

const router = express.Router();

router.get('/', getAllCreators)
router.get('/:id', authMiddleware, getCreatorById)
router.post('/', authMiddleware, creatorValidationRules(), createCreator)
router.put('/:id', authMiddleware, creatorValidationRules(), updateCreator)
router.patch('/:id', authMiddleware, patchCreator)
router.delete('/:id', authMiddleware, deleteCreatorById)

export default router;