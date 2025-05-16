import express from 'express';
import { 
    fetchAllReviews, 
    fetchReview, 
    createReview, 
    updateReview, 
    deleteReview 
} 
  from "../controllers/reviewsController"

import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)

// These can only be used when logged in
router.post('/', createReview)
router.patch('/:id', verifyAccessToken, updateReview)
router.delete('/:id', verifyAccessToken, deleteReview)

export default router;