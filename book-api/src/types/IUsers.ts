import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUsers {
    _id: number;
    username: string;
    password: string;
    is_admin: boolean;
    created_at: Date;
}

export interface DecodedUser extends JwtPayload{
    username: string;
    is_admin: boolean;
}

export interface CustomRequest extends Request {
    user?: DecodedUser;
}

