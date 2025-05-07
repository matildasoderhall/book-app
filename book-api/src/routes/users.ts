import express from "express";
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from "../controllers/usersController";
import { verifyAccesToken } from "../middleware/verifyToken";

const router = express.Router();

router.get('/', fetchAllUsers);
router.get('/:id', fetchUser);
router.patch('/:id', verifyAccesToken, updateUser);
router.delete('/:id', verifyAccesToken, deleteUser);

export default router;
