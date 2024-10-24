import express from 'express';
import { createCreator } from '../controllers/creatorController.js';


const router =express.Router();

router.post('/',createCreator)

export default router;