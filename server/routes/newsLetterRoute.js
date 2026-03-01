import express from "express";
import { newsLetter } from "../controllers/newLetterController.js";

const newsLetterRouter = express.Router();

// Route : inscription à la newsletter (public)
newsLetterRouter.post("/", newsLetter);

export default newsLetterRouter;
