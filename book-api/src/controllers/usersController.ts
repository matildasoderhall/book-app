import { Request, Response } from "express";
import Users from "../models/Users";
import mongoose from "mongoose";



export const fetchAllUsers = async (_: Request, res: Response) => {
    try {
        res.json(await Users.find());
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    };
};

export const fetchUser = async (req: Request, res: Response) => {
    try {
        const user = await Users.findById(req.params.id)
        
        if (!user) {
            res.status(404).json({message: 'User not found'})
            return;
        }
        res.json(user);
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    };
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, password, is_admin } = req.body;


    if (username === undefined || password === undefined || is_admin === undefined) {
        res.status(400).json({error: 'Username, password and is_admin is required'});
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid ID format'})
        return;
    }

    try {
        const updateUser = await Users.findByIdAndUpdate(
            id, 
            { username, password, is_admin },
            { new: true }
        );

        if (!updateUser) {
            res.status(404).json({message: 'User not found'});
            return;
        }

        res.status(200).json({message: 'User updated', data: await Users.findById(id)});
    } catch (error: unknown){
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
};