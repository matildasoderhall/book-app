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
router.post('/', verifyAccessToken, createBook) // Need to add TOKEN / auth middleware
router.patch('/:id', verifyAccessToken, updateBook) // Need to add TOKEN / auth middleware
router.delete('/:id', verifyAccessToken, deleteBook) // Need to add TOKEN / auth middleware

export default router;
