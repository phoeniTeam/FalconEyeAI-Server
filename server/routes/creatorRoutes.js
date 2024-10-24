import express from 'express';
import {  deleteCreatorById, getAllCreators, getCreatorById, updateCreator } from '../controllers/creatorController.js';


const router =express.Router();

// router.post('/',createCreator)
// router.get('/', loginCreator )
router.get('/', getAllCreators)
router.get('/:id', getCreatorById)
router.put('/:id', updateCreator)
router.delete('/:id', deleteCreatorById)

export default router;