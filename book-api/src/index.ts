import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


const app = express();

// Middleware
app.use(express.json()); // This specific middleware parses JSON string to Javascript Object
app.use(cookieParser()); // This specific middleware parses Cookies
app.use(cors({
  origin: 'https://book-app-e4a0ik6ub-matildas-projects-9486ffec.vercel.app/',         // This makes the Express server except request from other domains
  credentials: true    // Allows cookies sent to this API
}));        



// // Routes
import userRouter from './routes/users'
app.use('/users', userRouter)

import bookRouter from './routes/books'
app.use('/books', bookRouter)

import reviewRouter from './routes/reviews'
app.use('/reviews', reviewRouter)

import authRouter from "./routes/auth"
app.use('/auth', authRouter)


// Connect To DB
mongoose.connect(process.env.MONGODB_URL || "");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});