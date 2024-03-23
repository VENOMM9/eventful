import { Request, Response, NextFunction } from 'express';
import {User, UserRole} from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Define a custom type declaration for the user property
declare global {
    namespace Express {
        interface Request {
            user: any; // Define the type of the user property here
            user_id: string; // Assuming _id is of type string
        }
    }
}



const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;

        if (!token && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw new Error("Token not found");
        }

        // Split the token string by space
        const tokenParts = token.split(' ');

        // Check if tokenParts array has 2 elements (Bearer prefix and token value)
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            throw new Error("Invalid token format");
        }

        // Extract token value without the prefix
        token = tokenParts[1];
        console.log("Token:", token);
        token.split
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


 const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
  
  const authorizeEventCreator = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role !== UserRole.EVENT_CREATOR && user.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
  
   const authorizeEventAttendee = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role !== UserRole.EVENT_CREATOR && user.role !== UserRole.ADMIN) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
  export { authenticateUser, authorizeEventAttendee, authorizeEventCreator, authorizeAdmin };
