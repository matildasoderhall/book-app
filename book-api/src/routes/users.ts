import express from "express";
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from "../controllers/usersController";

const router = express.Router();

router.get('/', fetchAllUsers);
router.get('/:id', fetchUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
