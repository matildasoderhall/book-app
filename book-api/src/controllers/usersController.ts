import { Request, Response } from "express";
import Users from "../models/Users";



export const fetchAllUsers = async (_: Request, res: Response) => {
    try {
        res.json(await Users.find());
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    };
};
