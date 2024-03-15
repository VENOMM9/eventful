"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const auth_1 = __importDefault(require("../globalmiddleware/auth"));
const eventRouter = express_1.default.Router();
eventRouter.post('/create-event', auth_1.default, eventController_1.postCreateEvent);
eventRouter.get('/allevents', eventController_1.getAllEvents);
exports.default = eventRouter;
