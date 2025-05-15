import { Types } from "mongoose";

export interface IReview {
    name: string;
    content: string;
    rating: number;
    created_at: Date;
    book: Types.ObjectId;
  }
