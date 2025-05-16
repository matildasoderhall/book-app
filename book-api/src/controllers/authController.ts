import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users';
import { CustomRequest } from '../types/IUsers';

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

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({message: 'Username and password are required'})
        return;
    }

    try {
        const user = await Users.findOne({ username })

        if (!user) {
            res.status(401).json({message: 'Username is incorrect'})
            return;
        }

        const isHashed = user.password.startsWith('$2b$');

        if (!isHashed) {
            console.warn(`Plaintext password found for user "${username}". Hashing it now.`);
            
            const hashed = await bcrypt.hash(user.password, 10);
            user.password = hashed;

            await user.save();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
            res.status(401).json({ message: 'Password is incorrect' });
            return;
        }
        const accessToken = jwt.sign(
            {username: user.username, is_admin: user.is_admin}, 
            process.env.JWT_SECRET || "", 
            {expiresIn: "7d"}
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
    
        res.status(200).json({
            message: 'You are logged in', 
            is_admin: user.is_admin,
            username: user.username
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unkown error'
        res.status(500).json({error: message})
    }
};

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
    if (!req.user) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    res.status(200).json({
        username: req.user.username,
        is_admin: req.user.is_admin
    });
};

export const logout = async (_: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.json({message: 'You have been logged out'})
};


