import express from "express"; 
import {contact } from "../controllers/contactController.js";

const contactRouter = express.Router(); 

//Route : envoie du formulaire du contact ( public )
contactRouter.post("/", contact); 

export default contactRouter; 