import { Router } from "express";
import { getPromptMessage } from "../controllers/promptController.js";
import { validatePromptMessage } from "../middlewares/validationMiddleware.js"

const router = Router();

router.post("/", validatePromptMessage, getPromptMessage);

export default router;