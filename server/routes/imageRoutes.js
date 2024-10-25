import express from "express";
import { createImage, deleteImage, getAllImages, getImageById, patchImage, updateImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", createImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.put("/:id", updateImage);
router.patch("/:id", patchImage);
router.delete("/:id", deleteImage);

export default router;
