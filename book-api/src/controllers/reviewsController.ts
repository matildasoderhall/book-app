import { Request, Response } from "express";
import Review from '../models/Reviews';
import Reviews from "../models/Reviews";
import mongoose from "mongoose";
import Book from "../models/Book";

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
      const review = await Reviews.findById(id)
      
      if (!review) {
        res.status(404).json({message: 'Review not found'})
        return;
      }

      res.json(review);

    } catch(error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    };
  };


export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating, bookId } = req.body;
    
    //makes sure name, content and rating is entered
    if (name === undefined || content === undefined || rating === undefined || bookId === undefined) {
      res.status(400).json({ error: "Name, content, rating and bookId are required" });
      return;
    }
    //checks valid bookId format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: "Invalid bookId format" });
      }

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ error: "Book not found" });

      const newReview = new Review({
        name,
        content,
        rating,
        book: bookId
      });
  
      const savedReview = await newReview.save();

      book.reviews.push(savedReview._id);
      await book.save();
  
      res.status(201).json({ message: "Review created and linked to book", review: savedReview });
      
    } catch (error) {
      //if an unexpected error occurs
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };

export const updateReview = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, content, rating } = req.body;

    if (name === undefined || content === undefined || rating === undefined) {
        res.status(400).json({ error: "Name, content and rating are required"});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format"})
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { name, content, rating },
            { new: true, runValidators: true} //runValidators makes sure the Schema is followed, 
            //which in this case means that the user only is allowed to update the rating between 1-5
        );
        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found"});
        };

        res.status(200).json({ message: "Review updated", review: updatedReview})

    } catch (error: unknown) {

        //if the error is because of the fact that the rating is not between 1-5,
        //throw a 400 status code instead of 500
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ error: error.message });
          }

        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message});
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
  
    try {
      const review = await Review.findById(id)
      
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      };

      await Book.findByIdAndUpdate(review.book, {
        $pull: { reviews: review._id }
      });

      await Review.findByIdAndDelete(id);
  
      res.status(200).json({message: "Review deleted and removed from book", review})
    } catch (error: unknown) {
      const message = error  instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({error: message})
    }
  };
  