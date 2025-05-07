import express from "express";
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from "../controllers/usersController";
import { verifyAccessToken } from "../middleware/verifyToken";

const router = express.Router();

router.get('/', fetchAllUsers);
router.get('/:id', fetchUser);
router.patch('/:id', verifyAccessToken, updateUser);
router.delete('/:id', verifyAccessToken, deleteUser);

export default router;
