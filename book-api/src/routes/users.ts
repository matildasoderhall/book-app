import express from "express";
import { fetchAllUsers, fetchUser, updateUser } from "../controllers/usersController";

const router = express.Router();

router.get('/', fetchAllUsers);
router.get('/:id', fetchUser);
router.patch('/:id', updateUser);

export default router;
