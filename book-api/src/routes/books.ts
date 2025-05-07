import express from 'express';
import { 
  createBook, 
  deleteBook, 
  fetchAllBooks, 
  fetchBook, 
  updateBook 
  } from '../controllers/booksController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = express.Router()

router.get('/', fetchAllBooks)
router.get('/:id', fetchBook)

// Password protected
router.post('/', createBook) // Need to add TOKEN / auth middleware
router.patch('/:id', updateBook) // Need to add TOKEN / auth middleware
router.delete('/:id', deleteBook) // Need to add TOKEN / auth middleware

export default router;
