"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authorizeEventCreator = exports.authorizeEventAttendee = exports.authenticateUser = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        token.split;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        req.user_id = decoded.user._id;
        console.log(decoded);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(302);
    }
});
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== user_1.UserRole.ADMIN) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeEventCreator = (req, res, next) => {
    const user = req.user;
    if (user.role !== user_1.UserRole.EVENT_CREATOR && user.role !== user_1.UserRole.ADMIN) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
exports.authorizeEventCreator = authorizeEventCreator;
const authorizeEventAttendee = (req, res, next) => {
    const user = req.user;
    if (user.role !== user_1.UserRole.EVENT_CREATOR && user.role !== user_1.UserRole.ADMIN) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
exports.authorizeEventAttendee = authorizeEventAttendee;
