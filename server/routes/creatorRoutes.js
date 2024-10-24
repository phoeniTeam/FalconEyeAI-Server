import express from 'express';
import {  getAllCreators } from '../controllers/creatorController.js';


const router =express.Router();

// router.post('/',createCreator)
// router.get('/', loginCreator )
router.get('/', getAllCreators)

export default router;