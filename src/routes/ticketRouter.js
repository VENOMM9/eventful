"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const middleware_1 = require("../middleware/middleware");
const auth_1 = __importDefault(require("../globalmiddleware/auth"));
const ticketRouter = express_1.default.Router();
ticketRouter.post('/create-ticket', middleware_1.validateCreateTicket, ticketController_1.createTicketController);
ticketRouter.get('/tickets', ticketController_1.getAllTicketsController);
ticketRouter.get('/dashboard', ticketController_1.getDashboardController);
ticketRouter.get('/:ticketId', auth_1.default, ticketController_1.getTicketDetailsController);
ticketRouter.put('/:ticketId', ticketController_1.updateTicketController);
ticketRouter.delete('/:ticketId', ticketController_1.deleteTicketController);
exports.default = ticketRouter;
