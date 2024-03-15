"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = __importDefault(require("../controllers/ticketController"));
const ticketRouter = express_1.default.Router();
ticketRouter.post('/create-ticket', ticketController_1.default.createTicket);
ticketRouter.get('/tickets', ticketController_1.default.getAllTickets);
exports.default = ticketRouter;
