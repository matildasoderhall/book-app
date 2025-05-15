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
router.post('/', createReview)

// These can only be used when logged in
router.patch('/:id', verifyAccessToken, updateReview)
router.delete('/:id', verifyAccessToken, deleteReview)

export default router;