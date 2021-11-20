import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IPayload{
    _id: string;
    iat: number;
}
export const TokenValidation = (req: Request,res: Response,next: NextFunction) => {
    try {
        const token = req.header('token');
        if(!token) return res.json('Access Denied');
        const payload = jwt.verify(token, 'TOKEN_SECRET') as IPayload
        next();
    } catch (e) {
        res.json('Token Invalido');
    }
}