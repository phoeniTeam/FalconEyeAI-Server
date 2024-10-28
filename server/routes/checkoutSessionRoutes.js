import express from "express";
import { checkoutSession } from "../controllers/checkoutSessionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', checkoutSession);

export default router;

