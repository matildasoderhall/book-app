import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users';

export const register = async (req: Request, res: Response) => {
    const {username, password, is_admin} = req.body;

    if (!username || !password) {
        res.status(400).json({error: 'Username and password are required'});
        return;
    }

    try {
        const existingUser = await Users.findOne({ username });

        if(existingUser) {
            res.status(409).json({error: 'Username already exists'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Users({
            username,
            password: hashedPassword,
            is_admin: is_admin || false,
        });

        await newUser.save();

        res.status(201).json({message: 'User registered'})
    } catch(error: unknown) {
        const message = error instanceof Error ? error.message : 'Unkown error'
        res.status(500).json({error: message})
    }
};


