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
const user_1 = __importDefault(require("../models/user")); // Import the User type
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthService {
    createUser(first_name, last_name, email, password, country) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.default.findOne({ email: email });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const user = yield user_1.default.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    country: country,
                });
                const token = jsonwebtoken_1.default.sign({ user: { first_name: user.first_name, email: user.email, _id: user._id } }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return { user, token };
            }
            catch (error) {
                console.log(error);
                throw new Error("User creation failed");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: email });
                if (!user) {
                    throw new Error("User not found");
                }
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!validPassword) {
                    throw new Error("Invalid password");
                }
                const token = jsonwebtoken_1.default.sign({ user: { first_name: user.first_name, email: user.email, _id: user._id } }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return token;
            }
            catch (error) {
                throw new Error("Authentication failed" + " " + error.message);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                return users;
            }
            catch (error) {
                throw new Error("Failed to fetch users");
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                throw new Error("Failed to fetch user by ID");
            }
        });
    }
    updateUserById(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_1.default.findByIdAndUpdate(userId, updatedData, { new: true });
                if (!updatedUser) {
                    throw new Error("User not found");
                }
                return updatedUser;
            }
            catch (error) {
                throw new Error("Failed to update user");
            }
        });
    }
    deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_1.default.findByIdAndDelete(userId);
                if (!deletedUser) {
                    throw new Error("User not found");
                }
                return deletedUser;
            }
            catch (error) {
                throw new Error("Failed to delete user");
            }
        });
    }
}
exports.default = new AuthService();
