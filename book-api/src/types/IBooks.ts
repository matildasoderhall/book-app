import { ObjectId }  from "mongoose";

export interface IBooks {
    
    title: string;
    description: string;
    author: string;
    genres: string[];
    image: string;
    published_year: number;
    reviews: ObjectId[];

}