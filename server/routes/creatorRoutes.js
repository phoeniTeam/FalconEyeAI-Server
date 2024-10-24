import express from 'express';
import { createCreator, loginCreator } from '../controllers/creatorController.js';


const router =express.Router();

router.post('/',createCreator)
router.get('/', loginCreator )

export default router;