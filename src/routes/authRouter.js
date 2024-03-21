"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// auth.routes.js
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
const middleware_1 = require("../middleware/middleware");
authRouter.post('/login', authController_1.default.login);
authRouter.post('/signup', middleware_1.validateCreateUser, authController_1.default.createUser);
authRouter.get('/users', authController_1.default.getAllUsers);
authRouter.delete('/:userId', authController_1.default.deleteUser);
authRouter.put('/:userId', authController_1.default.updateUser);
authRouter.get('/:userId', authController_1.default.getUserById);
exports.default = authRouter;
