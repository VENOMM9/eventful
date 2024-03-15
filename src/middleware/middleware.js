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
exports.validateCreateEvent = exports.validateCreateTicket = exports.validateLogin = exports.validateCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation middleware for creating a user
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            first_name: joi_1.default.string().trim().required().messages({
                'string.empty': `"First name" cannot be empty`,
                'any.required': `"First name" is required`,
            }),
            last_name: joi_1.default.string().trim().required().messages({
                'string.empty': `"Last name" cannot be empty`,
                'any.required': `"Last name" is required`,
            }),
            email: joi_1.default.string().trim().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }).required().messages({
                'string.email': `"email" must be a valid email address`,
                'string.empty': `"email" cannot be empty`,
                'any.required': `"email" is required`,
            }),
            password: joi_1.default.string().min(8).required().messages({
                'string.min': `"Password" should be at least 8 characters long`,
                'string.empty': `"Password" cannot be empty`,
                'any.required': `"Password" is required`,
            }),
            country: joi_1.default.string().trim().required().messages({
                'string.empty': `"Country" cannot be empty`,
                'any.required': `"Country" is required`,
            })
        });
        yield schema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: error.details.map((err) => err.message.replace(/['"]/g, '')).join(', '),
            success: false
        });
    }
});
exports.validateCreateUser = validateCreateUser;
// Validation middleware for user login
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginSchema = joi_1.default.object({
            password: joi_1.default.string().empty().required().messages({
                "string.base": `"password" must be of type "text"`,
                "string.empty": `"password" cannot be empty`,
                "string.required": `"password" is required`,
            }),
            email: joi_1.default.string().email().empty().required().messages({
                "string.base": `"email" must be of type "text"`,
                "string.empty": `"email" cannot be empty`,
                "string.required": `"email" is required`,
            }),
        });
        yield loginSchema.validateAsync(req.body, { abortEarly: true });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        });
    }
});
exports.validateLogin = validateLogin;
// Validation middleware for creating a ticket
const validateCreateTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            eventId: joi_1.default.string().required().trim(), // eventId validation
            userId: joi_1.default.string().required().trim(), // userId validation
            ticketType: joi_1.default.string().required().trim(), // ticketType validation
            price: joi_1.default.number().required(), // price validation
            quantity: joi_1.default.number().required(), // quantity validation
            // Add more fields as needed
        });
        yield schema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: error.details.map((err) => err.message.replace(/['"]/g, '')).join(', '),
            success: false
        });
    }
});
exports.validateCreateTicket = validateCreateTicket;
// Validation middleware for creating an event
const validateCreateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            // Define validation schema for event creation
            // Example:
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            date: joi_1.default.date().required(),
            location: joi_1.default.string().required(),
            // Add more fields as needed
        });
        yield schema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        return res.status(422).json({
            message: error.details.map((err) => err.message.replace(/['"]/g, '')).join(', '),
            success: false
        });
    }
});
exports.validateCreateEvent = validateCreateEvent;
