import { Request, Response } from "express";
import Book from "../models/Book"


export const fetchAllBooks = async (_: Request, res: Response) => {
  try {
    res.json(await Book.find());
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
