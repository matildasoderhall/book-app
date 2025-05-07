import { Request, Response } from "express";
import Review from '../models/Reviews';
import Reviews from "../models/Reviews";

export const fetchAllReviews = async (_: Request, res: Response) => {
    try {
      res.json(await Reviews.find());
    } catch(error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    }
  }