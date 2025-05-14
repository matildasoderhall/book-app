import express from "express";
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from "../controllers/usersController";
import { verifyAccessToken, verifyAdmin } from "../middleware/verifyToken";
import { getCurrentUser } from "../controllers/authController";

const router = express.Router();

router.get('/', fetchAllUsers);
router.get('/me', verifyAccessToken, getCurrentUser);
router.get('/:id', fetchUser);
router.patch('/:id', verifyAccessToken, verifyAdmin, updateUser);
router.delete('/:id', verifyAccessToken, verifyAdmin, deleteUser);


export default router;
