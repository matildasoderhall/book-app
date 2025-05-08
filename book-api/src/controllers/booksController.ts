import { Request, Response } from "express";
import Book from "../models/Book"

// GET all books in DB

export const fetchAllBooks = async (_: Request, res: Response) => {
  try {
    res.json(await Book.find());
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

// GET one book by ID param

export const fetchBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        
        if (!book) {
            res.status(404).json({message: 'Book not found'})
            return;
        }
        res.json(book);
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    };
};

// POST new book to DB

export const createBook = async (req: Request, res: Response) => {
  const { title, description, author, genres, image, published_year } = req.body;
  

  if (!title || !description || !author || !genres || !image || !published_year ) {
    res.status(400).json({error: 'All book information required'}) 
    return; 
  }

  try {
    const createBook = new Book({
      title: title,
      description: description,
      author: author,
      genres: genres,
      image: image,
      published_year: published_year,
    });
     const savedBook = await createBook.save();
     res.status(201).json({message: 'Book entry created', data: savedBook})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}


export const updateBook = async (req: Request, res: Response) => {
  const { title, description, author, genres, image, published_year } = req.body;

  try {
    const updatedBook = await Book.updateOne(
      {_id : req.params.id}, 
      {$set: { 
        title: title,
        description: description,
        author: author,
        genres: genres,
        image: image,
        published_year: published_year,
        }
      }
    );

    if (updatedBook.matchedCount == 0) {
      res.status(404).json({success: false, message: 'Book not found' });
      return 
    }
    res.json({message: 'Book updated', data: await Book.findById(req.params.id)});
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.deleteOne({_id : req.params.id});

    if (deletedBook.deletedCount === 0) {
      res.status(404).json({success: false, message: 'Book not found' });
      return 
    }
    res.json({message: 'Book deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
