import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, DecodedUser } from '../types/IUsers';

export const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies?.accessToken;

    

    if (!token) {
        res.status(401).json({ message: 'Access token is missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedUser;

        req.user = decoded;
        next();
      } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }
    
};


export const verifyAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user?.is_admin) {
        res.status(403).json({ message: 'Admin access required.' });
        return;
    }
    next();
};
