import mongoose from "mongoose";
import { IReview } from "../types/IReviews";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema<IReview>({
  name: {
        type: String,
        required: true
    },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    //makes it only possible to rate the book between 1-5
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
});


export default mongoose.model('Review', ReviewSchema);