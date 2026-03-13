import express from "express";
import { createArtisan, getArtisans, verifyArtisanAuthenticityByCode } from "../controllers/artisanController.js";

const router = express.Router();

router.get("/", getArtisans);
router.get("/verify/:code", verifyArtisanAuthenticityByCode);
router.post("/", createArtisan);

export default router;
