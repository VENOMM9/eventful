"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const middleware_1 = require("../middleware/middleware");
const auth_1 = require("../globalmiddleware/auth");
const ticketRouter = express_1.default.Router();
// Public routes
ticketRouter.post('/create-ticket', middleware_1.validateCreateTicket, ticketController_1.createTicketController);
ticketRouter.get('/tickets', ticketController_1.getAllTicketsController);
ticketRouter.get('/dashboard', ticketController_1.getDashboardController);
ticketRouter.get('/:ticketId', ticketController_1.getTicketDetailsController); // Public route
// Protected routes (require authentication and authorization)
ticketRouter.put('/:ticketId', auth_1.authenticateUser, auth_1.authorizeEventCreator, ticketController_1.updateTicketController);
ticketRouter.delete('/:ticketId', auth_1.authenticateUser, auth_1.authorizeAdmin, ticketController_1.deleteTicketController);
exports.default = ticketRouter;
