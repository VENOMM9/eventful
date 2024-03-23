import express from 'express';
import { createTicketController, getDashboardController, getTicketDetailsController, getAllTicketsController, updateTicketController, deleteTicketController } from '../controllers/ticketController';
import { validateCreateTicket } from '../middleware/middleware';
import { authenticateUser, authorizeEventAttendee, authorizeEventCreator, authorizeAdmin } from '../globalmiddleware/auth';

const ticketRouter = express.Router();

// Public routes
ticketRouter.post('/create-ticket', validateCreateTicket, createTicketController);
ticketRouter.get('/tickets', getAllTicketsController);
ticketRouter.get('/dashboard', getDashboardController);
ticketRouter.get('/:ticketId', getTicketDetailsController); // Public route

// Protected routes (require authentication and authorization)
ticketRouter.put('/:ticketId', authenticateUser, authorizeEventCreator, updateTicketController);
ticketRouter.delete('/:ticketId', authenticateUser, authorizeAdmin, deleteTicketController);

export default ticketRouter;