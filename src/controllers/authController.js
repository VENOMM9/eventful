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
        console.log(token);
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        // Redirect to dashboard route after successful login
        res.redirect('/dashboard');
    }
    catch (error) {
        console.error(error);
        // Check the error message to determine the type of error
        if (error === "User not found") {
            return res.render('usernotfound.ejs');
        }
        else if (error === "Invalid credentials") {
            return res.render('invalidinfo.ejs');
        }
        else {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, country } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email: email });
        if (existingUser) {
            return res.render('existinguser.ejs');
        }
        const { user, token } = yield authService_1.default.createUser(first_name, last_name, email, password, country);
        console.log("New user created:", user);
        console.log("Token:", token);
        // Redirect to login route after successful user creation
        res.redirect('/login');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedData = req.body;
    try {
        const updatedUser = yield authService_1.default.updateUserById(userId, updatedData);
        res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    try {
        const user = yield authService_1.default.getUserById(userId);
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: "User not found" });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const deletedUser = yield authService_1.default.deleteUserById(userId);
        res.status(200).json({ success: true, message: "User deleted successfully", deletedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
});
exports.default = { login, createUser, getAllUsers, getUserById, updateUser, deleteUser };
