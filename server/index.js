import express from 'express'; 
import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import { connectMongo } from './DB/mongoDB.js';
import contactRouter from './routes/contactRoute.js';  
dotenv.config(); 

/**
 * Initialize Express App
 */
const app = express(); 

/**
 * Middleware
 */
app.use(cors()); 
app.use(express.json()); 

// Middleware pour forcer l'encodage UTF-8 dans les réponses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Connect to MongoDB
connectMongo(); 

// Routes 
app.get("/", (req, res) => {
  res.send("Tunzik Production Welcome Page")
})
app.use('/api/contact', contactRouter); 

// Start the server 
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT} and http://localhost:${process.env.PORT}`);
});