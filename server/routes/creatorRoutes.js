import express from 'express';
import {  getAllCreators, getCreatorById } from '../controllers/creatorController.js';


const router =express.Router();

// router.post('/',createCreator)
// router.get('/', loginCreator )
router.get('/', getAllCreators)
router.get('/:id', getCreatorById)

export default router;