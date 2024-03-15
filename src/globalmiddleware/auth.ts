import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Define a custom type declaration for the user property
declare global {
    namespace Express {
        interface Request {
            user: any; // Define the type of the user property here
            user_id: string; // Assuming _id is of type string
        }
    }
}

dotenv.config();

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;

        if (!token && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw new Error("Token not found");
        }

        console.log("Token:", token);

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded.user;
        req.user_id = decoded.user._id;

        console.log(decoded);

        next();
    } catch (error) {
        console.log(error);
        return res.status(302)
    }
};

export default authenticateUser;
