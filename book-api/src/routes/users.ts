import express from "express";
import { fetchAllUsers } from "../controllers/usersController";

const router = express.Router()

router.get('/', fetchAllUsers)

export default router;
