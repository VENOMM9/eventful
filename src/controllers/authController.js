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
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({
            email: email,
        });
        if (!user) {
            return res.status(404).redirect("/signup");
        }
        const validPassword = yield user.isValidPassword(password);
        if (!validPassword) {
            return res.status(302).redirect("/unknown");
        }
        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.status(200).redirect("/create");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password, country } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({
            email: email,
        });
        if (existingUser) {
            return res.redirect("/existinguser");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            country: country,
        });
        const token = jsonwebtoken_1.default.sign({ first_name: user.first_name, email: user.email, _id: user._id }, process.env.JWT_SECRET);
        res.status(302).redirect("/login");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = { login, createUser };
