import { Request, Response } from "express";
import Review from '../models/Reviews';
import Reviews from "../models/Reviews";
import mongoose from "mongoose";

export const fetchAllReviews = async (_: Request, res: Response) => {
    try {
      res.json(await Reviews.find());
    } catch(error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    };
  };


export const fetchReview = async (req: Request, res: Response) => {
    const id = req.params.id;
    
     // makes sure the ID is in the correct format
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });

    };
    try {
      const todo = await Reviews.findById(id)
      
      if (!todo) {
        res.status(404).json({message: 'Todo not found'})
        return;
      }

      res.json(todo);

    } catch(error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    };
  };