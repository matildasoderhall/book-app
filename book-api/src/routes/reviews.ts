import express from 'express';
import { 
    fetchAllReviews, 
    fetchReview, 
    createReview, 
    updateReview 
    //   deleteReview, 
} 
  from "../controllers/reviewsController"

// import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)
router.post('/', createReview)

// The 3 endpoints below are protected
router.patch('/:id', updateReview)
// router.delete('/:id',verifyAccessToken, deleteReview)

export default router;