import express from 'express';
import creatorValidator from '../Validators/creatorValidator.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCreator, deleteCreatorById, getAllCreators, getCreatorById, patchCreator, updateCreator } from '../controllers/creatorController.js';

const router = express.Router();

router.get('/', getAllCreators)
router.get('/:id', authMiddleware, getCreatorById)
router.post('/', authMiddleware, creatorValidator(), createCreator)
router.put('/:id', authMiddleware, creatorValidator(), updateCreator)
router.patch('/:id', authMiddleware, patchCreator)
router.delete('/:id', authMiddleware, deleteCreatorById)

export default router;