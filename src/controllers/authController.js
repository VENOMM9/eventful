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
const authService_1 = __importDefault(require("../services/authService"));
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield authService_1.default.login(email, password);
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        // Render a view instead of returning JSON
        res.render('loginSuccess', { success: true, message: "Login successful", token: token });
    }
    catch (error) {
        console.error(error);
        // Render a view for error handling
        res.render('error', { success: false, message: "Internal Server Error" });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, country } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email: email });
        if (existingUser) {
            // Render a view for user already existing
            return res.render('userExists', { success: false, message: "User already exists" });
        }
        const { user, token } = yield authService_1.default.createUser(first_name, last_name, email, password, country);
        console.log("New user created:", user);
        console.log("Token:", token);
        // Render a view for successful user creation
        res.render('userCreated', { success: true, message: "User created successfully" });
    }
    catch (error) {
        console.error(error);
        // Render a view for error handling
        res.render('error', { success: false, message: "Internal Server Error" });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authService_1.default.getAllUsers();
        res.status(200).json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
exports.default = { login, createUser, getAllUsers };
