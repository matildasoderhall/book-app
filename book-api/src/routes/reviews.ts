import express from 'express';
import { 
//   createReview, 
//   deleteReview, 
  fetchAllReviews, 
  fetchReview, 
//   updateReview 
} 
  from "../controllers/reviewsController"

// import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)

// The 3 endpoints below are protected
// router.post('/', verifyAccessToken, createReview)
// router.patch('/:id',verifyAccessToken, updateReview)
// router.delete('/:id',verifyAccessToken, deleteReview)

export default router;