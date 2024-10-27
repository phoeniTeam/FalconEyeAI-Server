import express from "express";
import { createImage, deleteImage, getAllImages, getImageById, patchImage, updateImage } from "../controllers/imageController.js";
import { imageValidationRules } from "../validators/imageValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, imageValidationRules(), createImage);
router.get("/", getAllImages);
router.get("/:id", authMiddleware, getImageById);
router.put("/:id", authMiddleware, imageValidationRules(), updateImage);
router.patch("/:id", authMiddleware, imageValidationRules(), patchImage);
router.delete("/:id", authMiddleware, deleteImage);

export default router;